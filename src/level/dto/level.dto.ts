import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator'
import mongoose from 'mongoose'

export class LevelDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'number is requried !!' })
  readonly number: number

  @IsNumber()
  @IsNotEmpty({ message: 'coins is requried !!' })
  readonly coins: number

  @IsString()
  @IsNotEmpty({ message: 'color is requried !!' })
  readonly color: string

  @IsString()
  @IsNotEmpty({ message: 'bg is requried !!' })
  readonly bg: string

  @IsOptional()
  _id: mongoose.Types.ObjectId
}
