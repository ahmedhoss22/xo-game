import { IsNotEmpty, IsOptional } from 'class-validator'
import mongoose from 'mongoose'

export class OrderDto {
  @IsOptional()
  user: mongoose.Types.ObjectId

  @IsNotEmpty({ message: 'product is requried !!' })
  product: mongoose.Types.ObjectId

  @IsOptional()
  _id: mongoose.Types.ObjectId
}
