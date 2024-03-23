import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { Level } from './level.schema'
import { LevelDto } from './dto/level.dto'
import { UpdateLevelDto } from './dto/update-level.dto'

@Injectable()
export class LevelService {
  constructor(@InjectModel(Level.name) private Level: Model<Level>) {}

  addLevel(data: LevelDto): Promise<Level> {
    let newLevel = new this.Level(data)
    return newLevel.save()
  }

  getLevels(): Promise<Level[]> {
    return this.Level.find()
  }

  updateLevel(data: UpdateLevelDto): Promise<Level> {
    return this.Level.findByIdAndUpdate(data._id, data)
  }

  deleteLevel(id: mongoose.Types.ObjectId): Promise<Level> {
    return this.Level.findByIdAndDelete(id)
  }
}
