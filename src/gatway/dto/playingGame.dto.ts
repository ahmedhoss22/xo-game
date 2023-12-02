import mongoose from "mongoose";

export interface PlayingGameDto {
  readonly userID: mongoose.Types.ObjectId;
  readonly move: number;
  readonly roomName :string
}
