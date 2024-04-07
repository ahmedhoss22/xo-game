import { IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator'
import mongoose from 'mongoose'

export class CoinStoreDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'price is requried !!' })
  readonly price: number

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'price is requried !!' })
  readonly coins: number

  @IsOptional()
  _id: mongoose.Types.ObjectId
}
