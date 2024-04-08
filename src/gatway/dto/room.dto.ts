import mongoose from 'mongoose'

export interface RoomDto {
  readonly userID1: mongoose.Types.ObjectId
  readonly userID2: mongoose.Types.ObjectId
   socketID1: string
   socketID2: string
  readonly roomName: string
  readonly coins: number
  readonly winCoins: number
  readonly rounds: number
  player1Moves: number[]
  player2Moves: number[]
  player1Wins: number
  player2Wins: number
  turn: number,
  autoPlay : boolean
}
