import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { CoinStoreDto } from './dtos/coin-store.dto'
import { UpdateCoinStoreDto } from './dtos/update-coin-store.dto'
import { CoinStore } from './coinStore.schema'

@Injectable()
export class CoinStoreService {
  constructor(
    @InjectModel(CoinStore.name) private CoinStore: Model<CoinStore>,
  ) {}

  addCoinStore(data: CoinStoreDto): Promise<CoinStore> {
    let newStore = new this.CoinStore(data)
    return newStore.save()
  }

  getCoinAllStores(): Promise<CoinStore[]> {
    return this.CoinStore.find()
  }

  getCoinStore(id: mongoose.Types.ObjectId): Promise<CoinStore> {
    return this.CoinStore.findById(id)
  }

  updateCoinStore(
    id: mongoose.Types.ObjectId,
    data: UpdateCoinStoreDto,
  ): Promise<CoinStore> {
    delete data._id
    return this.CoinStore.findByIdAndUpdate(id, data)
  }

  deleteCoinStore(id: mongoose.Types.ObjectId): Promise<CoinStore> {
    return this.CoinStore.findByIdAndDelete(id)
  }

  getOneCoinStore(field: any): Promise<CoinStore> {
    return this.CoinStore.findOne(field)
  }
}
