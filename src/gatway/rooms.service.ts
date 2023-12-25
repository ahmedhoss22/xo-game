import { Injectable } from '@nestjs/common';
import { MyGatway } from './gatway';
import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatchDto } from './dto/match.dto';
import { RoomDto } from './dto/room.dto';
import { PlayingGameDto } from './dto/playingGame.dto';
import { UserService } from 'src/users/users.service';
import mongoose from 'mongoose';
import { UtilitsService } from './utiltis.service';

@WebSocketGateway(5001, {
  cors: {
    // origin: [process.env.APP_DOMAIN, ],
    origin: ['http://localhost:3000', 'https://admin.socket.io'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class RoomsService implements OnGatewayDisconnect {
  // constructor() {}
  constructor(
    private readonly userService: UserService,
    private readonly utilitsService: UtilitsService,
  ) {}

  private server: Server;
  private waitingPlayers: MatchDto[] = [];
  private playingRooms: RoomDto[] = [];

  afterInit(server: Server) {
    this.server = server;
  }

  @SubscribeMessage('start-game')
  async handleMatch(client: Socket, data: MatchDto) {
    if (!this.server)
      return this.utilitsService.errorHandle(
        client.id,
        'Server instance not available.',
      );

    if (!data) {
      return this.utilitsService.errorHandle(
        client.id,
        'coins and userID and winCoins and rounds is required !!',
      );
    }

    // Validate data (coins and userID)
    if (!data.coins || !data.userID || !data.winCoins || !data.rounds) {
      return this.utilitsService.errorHandle(
        client.id,
        'coins and userID and winCoins and rounds is required !!',
      );
    }

    const roomName: string = 'room' + Date.now().toString();
    this.waitingPlayers = this.waitingPlayers.filter(
      (ele) => ele.socketID != client.id,
    );

    // valid object id
    if (!mongoose.isValidObjectId(data.userID)) {
      return this.utilitsService.errorHandle(
        client.id,
        'userID is not Valid !!',
      );
    }

    // valid coins in player acc
    let user = await this.userService.getUser(data.userID);
    if (!user) {
      return this.utilitsService.errorHandle(client.id, 'Invalid user ID !!');
    }
    if (user.coins < data.coins) {
      return this.utilitsService.errorHandle(
        client.id,
        'user coins not enough !!',
      );
    }

    // Check for a matching player
    const matched = this.checkForMatching(data, client.id, roomName);

    if (matched) {
      let room = this.playingRooms.find((ele) => ele.roomName == roomName);

      this.server.to(room.socketID1).socketsJoin(room.roomName);
      this.server.to(room.socketID2).socketsJoin(room.roomName);

      this.server.to(room.roomName).emit('matched', {
        message: 'You are matched! Start playing.',
        roomName,
        players: [room.socketID1, room.socketID2],
      });

      let arr = [...this.waitingPlayers, ...this.playingRooms];
      this.server.to(client.id).emit('online-players', arr);
      this.server.emit('online-players', arr);
      console.log('Waiting players : ' + this.waitingPlayers.length);
    } else {
      this.waitingPlayers.push({
        ...data,
        socketID: client.id,
        winCoins: data.winCoins,
      });

      let arr = [...this.waitingPlayers, ...this.playingRooms];
      this.server.to(client.id).emit('online-players', arr);
      this.server.emit('online-players', arr);

      console.log('Waiting players : ' + this.waitingPlayers.length);
      return;
    }
  }

  checkForMatching(
    data: MatchDto,
    socketID2: string,
    roomName: string,
  ): boolean {
    const matchedIndex = this.waitingPlayers?.findIndex(
      (ele) => ele.coins === data.coins && ele.userID !== data.userID,
    );

    if (matchedIndex !== -1) {
      const matchedPlayer = this.waitingPlayers.splice(matchedIndex, 1)[0];
      this.playingRooms.push({
        coins: data.coins,
        winCoins: data.winCoins,
        roomName,
        socketID1: matchedPlayer.socketID,
        socketID2,
        userID1: matchedPlayer.userID,
        userID2: data.userID,
        player1Moves: [],
        player2Moves: [],
        rounds: data.rounds,
        turn: 1,
        player1Wins: 0,
        player2Wins: 0,
      });
      return true; // Return true when a match is found
    }
    return false; // Return false when no match is found
  }

  handleDisconnect(client: Socket) {
    this.waitingPlayers = this.waitingPlayers.filter(
      (ele) => ele.socketID != client.id,
    );
    console.log('Waiting players ' + this.waitingPlayers.length);
    let arr = [...this.waitingPlayers, ...this.playingRooms];
    this.server.to(client.id).emit('online-players', arr);
    this.server.emit('online-players', arr);
  }

  //game play
  @SubscribeMessage('player-move')
  handlePlayerMove(client: Socket, data: PlayingGameDto) {
    //validation
    if (!data.move || !data.roomName || !data.userID) {
      return this.utilitsService.errorHandle(
        client.id,
        'Move and userID and roomName is required !!',
      );
    }

    if (!mongoose.isValidObjectId(data.userID)) {
      return this.utilitsService.errorHandle(
        client.id,
        'userID is not Valid !!',
      );
    }

    let match = this.playingRooms.find((ele) => ele.roomName == data.roomName);
    if (!match) {
      return this.utilitsService.errorHandle(
        client.id,
        'Player not in match !!',
      );
    }
    if (
      match.player1Moves.includes(data.move) ||
      match.player2Moves.includes(data.move)
    ) {
      return this.utilitsService.errorHandle(
        client.id,
        'Move is already taken !!',
      );
    }

    let player =
      client.id == match.socketID1
        ? {
            playerNo: 1,
            playerMoves: match.player1Moves,
            playerWins: match.player1Wins,
            playerSocket: match.socketID1,
          }
        : {
            playerNo: 2,
            playerMoves: match.player2Moves,
            playerWins: match.player2Wins,
            playerSocket: match.socketID2,
          };

    console.log(player);

    //turn validation
    if (player.playerNo == 1 && match.turn == 2) {
      return this.utilitsService.errorHandle(
        client.id,
        'Its the turn for other player !!',
      );
    }
    if (player.playerNo == 2 && match.turn == 1) {
      return this.utilitsService.errorHandle(
        client.id,
        'Its the turn for other player !!',
      );
    }

    // display turn for other player

    if (player.playerNo == 1) {
      console.log('Other move 1');
      this.server.to(match.socketID2).emit('other-move', {
        move: data.move,
      });
    } else {
      console.log('Other move 2');
      this.server.to(match.socketID1).emit('other-move', {
        move: data.move,
      });
    }

    //turn Switch
    player.playerNo == 1
      ? match.player1Moves.push(data.move)
      : match.player2Moves.push(data.move);
    player.playerNo == 1 ? (match.turn = 2) : (match.turn = 1);

    let winner = this.utilitsService.checkWinner(
      client.id == match.socketID1 ? match.player1Moves : match.player2Moves,
    );

    if (winner) {
      // update player winning times
      if (client.id == match.socketID1) {
        match.player1Wins += 1;
      } else {
        match.player2Wins += 1;
      }

      let gameEnd = this.utilitsService.checkEndGame(match);
      if (gameEnd) {
        if (client.id == match.socketID1) {
          this.utilitsService.handleEndGame(
            client.id,
            match.userID1,
            match.socketID2,
            match.userID2,
            match.coins,
            match.winCoins,
            match.roomName,
          );
        } else {
          this.utilitsService.handleEndGame(
            client.id,
            match.userID2,
            match.socketID1,
            match.userID1,
            match.coins,
            match.winCoins,
            match.roomName,
          );
        }
      } else {
        match.player1Moves = [];
        match.player2Moves = [];
        this.server.emit('reset-game', { message: 'new round', data: match });
      }
    } else {
      this.server
        .to(client.id == match.socketID2 ? match.socketID1 : match.socketID2)
        .emit('my-turn', {
          message: 'Your turn ',
        });
    }

    // update playing room
    this.playingRooms = this.playingRooms.map((ele) => {
      if (ele.roomName == data.roomName) {
        return match;
      } else {
        return ele;
      }
    });
    console.log(this.playingRooms);
  }

  @SubscribeMessage('online-players')
  getOnlinePlayers(client: Socket) {
    let arr = [...this.waitingPlayers, ...this.playingRooms];
    this.server.to(client.id).emit('online-players', arr);
    this.server.emit('online-players', arr);
  }

  @SubscribeMessage('exit-waiting')
  exitWaiting(client: Socket) {
    let arr = this.waitingPlayers.filter((ele) => ele.socketID != client.id);
    this.waitingPlayers = arr;
  }
}
