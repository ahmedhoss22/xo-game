import { IsNotEmpty, IsNumber, IsPositive, IsOptional, IsString } from 'class-validator'
import mongoose from 'mongoose'

export class CoinStoreDto {
  @IsString()
  @IsNotEmpty({ message: 'message is requried !!' })
  readonly message: string

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'price is requried !!' })
  readonly coins: number

  @IsOptional()
  _id: mongoose.Types.ObjectId
}
