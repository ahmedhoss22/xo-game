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
  constructor(private readonly userService: UserService) {}

  private server: Server;
  private waitingPlayers: MatchDto[] = [];
  private playingRooms: RoomDto[] = [];

  afterInit(server: Server) {
    this.server = server;
  }

  @SubscribeMessage('start-game')
  async handleMatch(client: Socket, data: MatchDto) {
    const roomName: string = 'room' + Date.now().toString();

    // Check if the server instance is available
    if (!this.server) {
      console.error('Server instance not available.');
      return this.server.to(client.id).emit('error', {
        message: 'Server instance not available.',
      });
    }

    // Validate data (coins and userID)
    if (!data.coins || !data.userID) {
      return this.server
        .to(client.id)
        .emit('error', { message: 'coins and userID is required !!' });
    }

    // valid object id
    if (!mongoose.isValidObjectId(data.userID)) {
      return this.server
        .to(client.id)
        .emit('error', { message: 'userID is not Valid !!' });
    }

    // valid coins in player acc
    let user = await this.userService.getUser(data.userID);
    if (user.coins < data.coins) {
      return this.server
        .to(client.id)
        .emit('error', { message: 'user coins not enough !!' });
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
      console.log('Waiting players : ' + this.waitingPlayers.length);
    } else {
      this.waitingPlayers.push({ ...data, socketID: client.id });
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
        roomName,
        socketID1: matchedPlayer.socketID,
        socketID2,
        userID1: matchedPlayer.userID,
        userID2: data.userID,
        player1Moves: [],
        player2Moves: [],
        turn: 1,
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
  }

  //game play
  @SubscribeMessage('player-move')
  handlePlayerMove(client: Socket, data: PlayingGameDto) {
    //validation
    if (!data.move) {
      return this.server.to(client.id).emit('error', {
        message: 'Move is required !!',
      });
    }

    if (!data.roomName) {
      return this.server.to(client.id).emit('error', {
        message: 'roomName is required !!',
      });
    }

    if (!data.userID) {
      return this.server.to(client.id).emit('error', {
        message: 'userID is required !!',
      });
    }

    if (!mongoose.isValidObjectId(data.userID)) {
      return this.server.to(client.id).emit('error', {
        message: 'userID is not Valid !!',
      });
    }

    let match = this.playingRooms.find((ele) => ele.roomName == data.roomName);

    if (!match) {
      return this.server.to(client.id).emit('error', {
        message: 'Player not in match !!',
      });
    }

    if (
      match.player1Moves.includes(data.move) ||
      match.player2Moves.includes(data.move)
    ) {
      return this.server.to(client.id).emit('error', {
        message: 'Move is already taken !!',
      });
    }

    // set move
    if (data.userID == match.userID1) {
      //check for the player turn
      if (match.turn == 2) {
        return this.server.to(client.id).emit('error', {
          message: "It's the turn for other player !!",
        });
      }
      match.player1Moves.push(data.move);
      match.turn = 2;

      console.log(match);
      //check for winning
      let winner = this.checkWinner(match.player1Moves);

      // End game if winner
      if (winner) {
        this.handleEndGame(
          client.id,
          match.userID1,
          match.socketID2,
          match.userID2,
          match.coins,
          match.roomName,
        );
      }
    } else {
      //check for the player turn
      if (match.turn == 1) {
        return this.server.to(client.id).emit('error', {
          message: "It's the turn for other player !!",
        });
      }
      match.player2Moves.push(data.move);
      match.turn = 1;

      //check for winning
      let winner = this.checkWinner(match.player1Moves);

      // End game if player 2 winner
      if (winner) {
        this.handleEndGame(
          client.id,
          match.userID2,
          match.socketID1,
          match.userID1,
          match.coins,
          match.roomName,
        );
      }
    }

    // update playing room
    this.playingRooms = this.playingRooms.map((ele) => {
      if (ele.roomName == data.roomName) {
        return match;
      } else {
        return ele;
      }
    });
  }

  checkWinner(moves: number[]): boolean {
    moves = moves.sort((a, b) => a - b);
    let checkMoves = moves.join('');
    let winner: boolean = false;

    // Array of winning conditions
    const winningConditions: number[][] = [
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [6, 7, 8],
      [8, 9, 10],
      [11, 12, 13],
      [12, 13, 14],
      [16, 17, 18],
      [17, 18, 19],
      [18, 19, 20],
      [21, 22, 23],
      [22, 23, 24],
      [23, 24, 25],
      [1, 6, 11],
      [6, 11, 16],
      [11, 16, 21],
      [2, 7, 12],
      [7, 12, 17],
      [12, 17, 22],
      [3, 8, 13],
      [8, 13, 18],
      [13, 18, 23],
      [4, 9, 14],
      [9, 14, 19],
      [14, 19, 24],
      [5, 10, 15],
      [10, 15, 20],
      [15, 10, 25],
      [1, 7, 13],
      [2, 8, 14],
      [3, 9, 15],
      [6, 12, 18],
      [7, 13, 19],
      [8, 14, 20],
      [11, 17, 23],
      [12, 18, 24],
      [3, 7, 11],
      [4, 8, 12],
      [5, 9, 13],
      [8, 12, 16],
      [9, 13, 17],
      [10, 14, 18],
      [13, 17, 21],
      [14, 18, 22],
      [15, 19, 23],
    ];

    // Check if any winning condition is met
    for (const condition of winningConditions) {
      if (condition.every((num) => checkMoves.includes(num.toString()))) {
        winner = true;
        break;
      }
    }

    return winner;
  }

  async handleEndGame(
    winnerSocket: string,
    winnerId: mongoose.Types.ObjectId,
    loserSocket: string,
    loserId: mongoose.Types.ObjectId,
    coins: number,
    matchSocket,
  ) {
    this.server.to(winnerSocket).emit('winner', {
      message: 'Winner player !!',
    });
    this.server.to(loserSocket).emit('loser', {
      message: 'You lose !!',
    });

    try {
      await this.userService.winnerCoins(winnerId, coins);
      await this.userService.loserCoins(loserId, coins);
    } catch (error) {
      let errorMsg = error.message;
      console.log(errorMsg);
      this.server.to(matchSocket).emit('error', {
        message: errorMsg,
      });
    }
  }
}
