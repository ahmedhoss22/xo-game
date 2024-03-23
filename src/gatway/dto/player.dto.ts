import mongoose from 'mongoose'

export interface PlayerDto {
  playerNo: number
  playerMoves: number[]
  playerWins: number
  playerSocket: string
}
