import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PlayingCoins } from './playing-coins.shema';
import mongoose, { Model } from 'mongoose';
import { PlayingCoinsDto } from './dtos/Playing-coins.dto';
import { UpdatePlayingCoinsDto } from './dtos/update-playing-coins.dto';

@Injectable()
export class PlayingCoinsService {
  constructor(
    @InjectModel(PlayingCoins.name) private PlayingCoins: Model<PlayingCoins>,
  ) {}

  addNewPlayingCoins(data: PlayingCoinsDto): Promise<PlayingCoins> {
    let newPlayingCoins = new this.PlayingCoins(data);
    return newPlayingCoins.save();
  }

  getAllPlayingCoins(): Promise<PlayingCoins[]> {
    return this.PlayingCoins.find();
  }

  getOnePlayingCoin(id:mongoose.Types.ObjectId):Promise<PlayingCoins>{
    return this.PlayingCoins.findById(id)
  }

  updatePlayingCoins (data:UpdatePlayingCoinsDto):Promise<PlayingCoins>{
    return this.PlayingCoins.findByIdAndUpdate(data._id,data)
  }

  async deletePlayingCoins(id: mongoose.Types.ObjectId): Promise<PlayingCoins> {
    return this.PlayingCoins.findByIdAndDelete(id);
  }
}
