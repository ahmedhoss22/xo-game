import { PartialType } from '@nestjs/mapped-types'
import { LevelDto } from './level.dto'
import mongoose from 'mongoose'
export class UpdateLevelDto extends PartialType(LevelDto) {
  _id: mongoose.Types.ObjectId
}
