import mongoose from 'mongoose';

export interface MatchDto {
  readonly userID: mongoose.Types.ObjectId;
  readonly socketID: string;
  readonly coins: number;
  readonly winCoins: number;
  readonly rounds: number;
}
