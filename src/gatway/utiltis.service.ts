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
export class UtilitsService {
  constructor(private readonly userService: UserService) {}
  private server: Server;
  private waitingPlayers: MatchDto[] = [];
  private playingRooms: RoomDto[] = [];

  afterInit(server: Server) {
    this.server = server;
  }

  errorHandle(sockerId: string, msg: string) {
    this.server.to(sockerId).emit('error', { message: msg });
  }

  checkWinner(moves: number[]): boolean {
    console.log(moves);

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

  checkEndGame(data: RoomDto): boolean {
    let player1win = data.player1Wins > data.rounds / 2;
    let player2win = data.player2Wins > data.rounds / 2;
    return (player1win || player2win) as boolean;
  }

  async handleEndGame(
    winnerSocket: string,
    winnerId: mongoose.Types.ObjectId,
    loserSocket: string,
    loserId: mongoose.Types.ObjectId,
    coins: number,
    winCoins: number,
    matchSocket: string,
  ) {
    this.server.to(winnerSocket).emit('winner', {
      message: 'Winner player !!',
    });
    this.server.to(loserSocket).emit('loser', {
      message: 'You lose !!',
    });

    try {
      await this.userService.winnerCoins(winnerId, winCoins);
      await this.userService.loserCoins(loserId, coins);
    } catch (error) {
      let errorMsg = error.message;
      console.log(errorMsg);
      return this.errorHandle(matchSocket, 'errorMsg');
    }
  }
}
