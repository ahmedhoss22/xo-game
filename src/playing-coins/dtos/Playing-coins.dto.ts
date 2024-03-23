import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator'
import mongoose from 'mongoose'

export class PlayingCoinsDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'rounds is requried !!' })
  readonly rounds: string

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'coins is requried !!' })
  readonly coins: string

  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'winCoins is requried !!' })
  readonly winCoins: number

  @IsString()
  @IsNotEmpty({ message: 'winCoins is requried !!' })
  readonly name: string

  @IsOptional()
  _id: mongoose.Types.ObjectId
}
