import mongoose from 'mongoose'

export interface AutoGameDto {
  readonly userID: mongoose.Types.ObjectId
  readonly socketID: string
}
