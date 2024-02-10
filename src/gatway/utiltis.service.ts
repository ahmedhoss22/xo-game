import { Inject, Injectable, forwardRef } from '@nestjs/common';
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
import { PlayerDto } from './dto/player.dto';
import { CustomDto } from './dto/custom-room.dto';
import { RoomsService } from './rooms.service';

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

  checkForMatching(
    data: MatchDto,
    socketID2: string,
    roomName: string,
    waitingPlayers: MatchDto[],
    playingRooms: RoomDto[],
  ): boolean {
    const matchedIndex = waitingPlayers?.findIndex(
      (ele) => ele.coins === data.coins && ele.userID !== data.userID,
    );

    if (matchedIndex !== -1) {
      const matchedPlayer = waitingPlayers.splice(matchedIndex, 1)[0];

      playingRooms.push({
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

  checkForJoinRoom(
    data: MatchDto,
    socketID2: string,
    roomName: string,
    customRooms: CustomDto[],
    playingRooms: RoomDto[],
  ): Boolean {
    let matchedIndex = customRooms.findIndex((ele) => ele.id == data.id);
    if (matchedIndex == -1) return false;
    const matchedPlayer = customRooms.splice(matchedIndex, 1)[0];
    playingRooms.push({
      coins: 0,
      winCoins: 0,
      roomName,
      socketID1: matchedPlayer.socketID,
      socketID2,
      userID1: matchedPlayer.userID,
      userID2: data.userID,
      player1Moves: [],
      player1Wins: 0,
      player2Wins: 0,
      player2Moves: [],
      turn: 1,
      rounds: 1,
    });
    return true;
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
      [1, 2, 3, 4],
      [2, 3, 4, 5],
      [6, 7, 8, 9],
      [7, 8, 9, 10],
      [11, 12, 13, 14],
      [12, 13, 14, 15],
      [16, 17, 18, 19],
      [17, 18, 19, 20],
      [21, 22, 23, 24],
      [22, 23, 24, 25],
      [1, 6, 11, 16],
      [6, 11, 16, 21],
      [2, 7, 12, 17],
      [7, 12, 17, 22],
      [3, 8, 13, 18],
      [8, 13, 18, 23],
      [4, 9, 14, 19],
      [9, 14, 19, 24],
      [5, 10, 15, 20],
      [10, 15, 20, 25],
      [1, 7, 13, 19],
      [2, 8, 14, 20],
      [6, 12, 18, 24],
      [7, 13, 19, 25],
      [4, 8, 12, 16],
      [5, 9, 13, 17],
      [9, 13, 17, 21],
      [10, 14, 18, 22],
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
  disconnectEndGame(clientId : string , room :RoomDto){
    if(clientId == room.socketID1){
        this.handleEndGame(
          room.socketID1,
          room.userID1,
          room.socketID2,
          room.userID2,
          room.coins,
          room.winCoins,
          room.roomName
        )
    }else{
      this.handleEndGame(
        room.socketID2,
        room.userID2,
        room.socketID1,
        room.userID1,
        room.coins,
        room.winCoins,
        room.roomName
      )
    }
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

    //remove room
    this.removePlayingRoom(matchSocket)
    try {
      await this.userService.winnerCoins(winnerId, winCoins);
      await this.userService.loserCoins(loserId, coins);

    } catch (error) {
      let errorMsg = error.message;
      console.log(errorMsg);
      return this.errorHandle(matchSocket, 'errorMsg');
    }
  }

  removePlayingRoom(roomName :string){
    RoomsService.playingRooms = RoomsService.playingRooms.filter((ele)=>ele.roomName != roomName)
  }


  isValidMoveData(data: PlayingGameDto): boolean {
    return !!data.move && !!data.roomName && !!data.userID;
  }

  isMoveAlreadyTaken(match: RoomDto, move: number): boolean {
    return (
      match.player1Moves.includes(move) || match.player2Moves.includes(move)
    );
  }

  getPlayerInfo(client: Socket, match: RoomDto) {
    return client.id === match.socketID1
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
  }

  isPlayerTurn(player: PlayerDto, match: RoomDto): boolean {
    return player.playerNo === 1 ? match.turn === 1 : match.turn === 2;
  }

  makeMove(player: PlayerDto, match: RoomDto, move: number): void {
    player.playerNo === 1
      ? match.player1Moves.push(move)
      : match.player2Moves.push(move);
    match.turn = player.playerNo === 1 ? 2 : 1;
  }

  handleWinner(client: Socket, match): void {
    const { userID1, socketID2, userID2, coins, winCoins, roomName } = match;
    const winnerID = client.id === match.socketID1 ? userID1 : userID2;

    match[client.id === match.socketID1 ? 'player1Wins' : 'player2Wins'] += 1;

    const gameEnd = this.checkEndGame(match);

    if (gameEnd) {
      const winnerSocket =
        client.id === match.socketID1 ? socketID2 : match.socketID1;
      this.handleEndGame(
        client.id,
        winnerID,
        winnerSocket,
        client.id === match.socketID1 ? userID2 : userID1,
        coins,
        winCoins,
        roomName,
      );

      this.waitingPlayers = this.waitingPlayers.filter(
        (ele) => ele.userID !== userID1 && ele.userID !== userID2,
      );
      this.playingRooms = this.playingRooms.filter(
        (ele) => ele.roomName !== roomName,
      );
    } else {
      match.player1Moves = [];
      match.player2Moves = [];
      this.server.emit('player-move', match);
    }
  }

  updatePlayingRooms(match: RoomDto): void {
    this.playingRooms = this.playingRooms.map((ele) =>
      ele.roomName === match.roomName ? match : ele,
    );
  }
}
