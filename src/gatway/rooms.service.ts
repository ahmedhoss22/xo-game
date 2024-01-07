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
import { PlayerDto } from './dto/player.dto';
import { CustomDto } from './dto/custom-room.dto';

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
  private customRooms: CustomDto[] = [];

  afterInit(server: Server) {
    this.server = server;
  }

  @SubscribeMessage('start-game')
  async handleMatch(client: Socket, data: MatchDto) {
    if (!this.server) {
      return this.utilitsService.errorHandle(
        client.id,
        'Server instance not available.',
      );
    }

    if (
      !data ||
      !data.coins ||
      !data.userID ||
      !data.winCoins ||
      !data.rounds
    ) {
      return this.utilitsService.errorHandle(
        client.id,
        'coins, userID, winCoins, and rounds are required!',
      );
    }

    const roomName: string = 'room' + Date.now().toString();
    this.waitingPlayers = this.waitingPlayers.filter(
      (ele) => ele.socketID !== client.id,
    );

    if (!mongoose.isValidObjectId(data.userID)) {
      return this.utilitsService.errorHandle(client.id, 'userID is not valid!');
    }

    try {
      // Fetch user details
      let user = await this.userService.getUser(data.userID);

      if (!user) {
        return this.utilitsService.errorHandle(client.id, 'Invalid user ID!');
      }

      if (user.coins < data.coins) {
        return this.utilitsService.errorHandle(
          client.id,
          'User coins not enough!',
        );
      }

      // Check for a matching player
      const matched = this.utilitsService.checkForMatching(
        data,
        client.id,
        roomName,
        this.waitingPlayers,
        this.playingRooms,
      );

      if (matched) {
        let room = this.playingRooms.find((ele) => ele.roomName == roomName);

        this.server.to(room.socketID1).socketsJoin(room.roomName);
        this.server.to(room.socketID2).socketsJoin(room.roomName);

        this.server.to(room.roomName).emit('matched', {
          message: 'You are matched! Start playing.',
          roomName,
          players: [room.socketID1, room.socketID2],
          room,
        });

        let arr = [...this.waitingPlayers, ...this.playingRooms];
        this.server.to(client.id).emit('online-players', arr);
        this.server.emit('online-players', arr);
        console.log('Waiting players: ' + this.waitingPlayers.length);
      } else {
        this.waitingPlayers.push({
          ...data,
          socketID: client.id,
          winCoins: data.winCoins,
        });
        console.log(this.waitingPlayers);
        let arr = [...this.waitingPlayers, ...this.playingRooms];
        this.server.to(client.id).emit('online-players', arr);
        this.server.emit('online-players', arr);

        console.log('Waiting players: ' + this.waitingPlayers.length);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      console.log(error);

      return this.utilitsService.errorHandle(
        client.id,
        'Error fetching user details.',
      );
    }
  }

  @SubscribeMessage('create-room')
  async createRoom(client: Socket, data: MatchDto) {
    if (!this.server) {
      return this.utilitsService.errorHandle(
        client.id,
        'Server instance not available.',
      );
    }

    if (!data || !data.userID) {
      return this.utilitsService.errorHandle(client.id, 'userID are required!');
    }

    this.customRooms = this.customRooms.filter(
      (ele) => ele.socketID !== client.id,
    );

    if (!mongoose.isValidObjectId(data.userID)) {
      return this.utilitsService.errorHandle(client.id, 'userID is not valid!');
    }

    try {
      let user = await this.userService.getUser(data.userID);
      if (!user) {
        return this.utilitsService.errorHandle(client.id, 'Invalid user ID!');
      }

      const randomNumber = Math.floor(Math.random() * 100000) + 1;
      const room = {
        id: randomNumber,
        userID: data.userID,
        socketID: client.id,
        winCoins: 0,
        coins: 0,
        rounds: 1,
      };

      this.customRooms.push(room);
      this.server.to(client.id).emit('create-room', {id:randomNumber});
    } catch (error) {
      return this.utilitsService.errorHandle(
        client.id,
        'Error fetching user details.',
      );
    }
  }

  @SubscribeMessage('join-room')
  async joinRoom(client: Socket, data: MatchDto) {
    if (!this.server) {
      return this.utilitsService.errorHandle(
        client.id,
        'Server instance not available.',
      );
    }

    if (!data || !data.userID || !data.id) {
      return this.utilitsService.errorHandle(
        client.id,
        'userID and id are required!',
      );
    }

    if (!mongoose.isValidObjectId(data.userID)) {
      return this.utilitsService.errorHandle(client.id, 'userID is not valid!');
    }

    let user = await this.userService.getUser(data.userID);

    if (!user) {
      return this.utilitsService.errorHandle(client.id, 'Invalid user ID!');
    }

    const roomName: string = 'room' + Date.now().toString();
    const matched = this.utilitsService.checkForJoinRoom(
      data,
      client.id,
      roomName,
      this.customRooms,
      this.playingRooms,
    );
    if (matched) {
      let room = this.playingRooms.find((ele) => ele.roomName == roomName);

      this.server.to(room.socketID1).socketsJoin(room.roomName);
      this.server.to(room.socketID2).socketsJoin(room.roomName);

      this.server.to(room.roomName).emit('matched', {
        message: 'You are matched! Start playing.',
        roomName,
        players: [room.socketID1, room.socketID2],
        room,
      });
    } else {
      return this.utilitsService.errorHandle(
        client.id,
        'No room with that Id !!',
      );
    }
  }

  handleDisconnect(client: Socket) {
    this.waitingPlayers = this.waitingPlayers.filter(
      (ele) => ele.socketID != client.id,
    );
    this.customRooms = this.customRooms.filter(
      (ele) => ele.socketID != client.id,
    );
    console.log('Waiting players ' + this.waitingPlayers.length);
    let arr = [...this.waitingPlayers, ...this.playingRooms];
    this.server.to(client.id).emit('online-players', arr);
    this.server.emit('online-players', arr);
  }

  @SubscribeMessage('player-move')
  handlePlayerMove(client: Socket, data: PlayingGameDto) {
    if (
      !this.utilitsService.isValidMoveData(data) ||
      !mongoose.isValidObjectId(data.userID)
    ) {
      return this.utilitsService.errorHandle(
        client.id,
        'Invalid move data or userID.',
      );
    }

    const match: RoomDto = this.playingRooms.find(
      (room) => room.roomName === data.roomName,
    );

    if (!match) {
      return this.utilitsService.errorHandle(client.id, 'Player not in match!');
    }

    if (this.utilitsService.isMoveAlreadyTaken(match, data.move)) {
      return this.utilitsService.errorHandle(
        client.id,
        'Move is already taken!',
      );
    }

    const player = this.utilitsService.getPlayerInfo(client, match);

    if (!this.utilitsService.isPlayerTurn(player, match)) {
      return this.utilitsService.errorHandle(
        client.id,
        "It's the turn for the other player!",
      );
    }

    this.utilitsService.makeMove(player, match, data.move);

    const winner = this.utilitsService.checkWinner(
      client.id === match.socketID1 ? match.player1Moves : match.player2Moves,
    );

    this.server.to(match.roomName).emit('player-move', match);

    if (winner) {
      this.utilitsService.handleWinner(client, match);
    } else {
      this.server
        .to(client.id === match.socketID2 ? match.socketID1 : match.socketID2)
        .emit('my-turn', { message: 'Your turn' });
    }

    this.utilitsService.updatePlayingRooms(match);
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
    let arr2 = [...this.waitingPlayers, ...this.playingRooms];
    this.server.emit('online-players', arr2);
  }

  @SubscribeMessage('get-room-data')
  getRoomData(client: Socket, id: mongoose.Types.ObjectId) {
    if (!id) return;
    let room = this.playingRooms.find(
      (ele) => ele.userID1 == id || ele.userID2,
    );
    this.server.to(client.id).emit('get-room-data', room);
  }
}
