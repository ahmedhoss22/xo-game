import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
import mongoose from 'mongoose';

export class StoreDto {
  // @IsNumber()
  // @IsPositive()
  @IsNotEmpty({ message: 'cost is requried !!' })
  readonly cost: number;

  //   @IsNotEmpty({ message: 'name is requried !!' })
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsOptional()
  _id: mongoose.Types.ObjectId;
}
