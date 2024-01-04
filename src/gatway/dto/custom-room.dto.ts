import mongoose from 'mongoose';

export interface CustomDto {
  readonly userID: mongoose.Types.ObjectId;
  readonly socketID: string;
  readonly coins: number;
  readonly winCoins: number;
  readonly rounds: number;
  readonly id:number;

}