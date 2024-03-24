import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';
import mongoose from 'mongoose';
import { IsStrongPassword } from 'src/utilites/password.util';

export class UserrDto {
  @IsOptional()
  readonly _id: mongoose.Types.ObjectId;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required !!' })
  readonly email: String;

  @IsString()
  @IsNotEmpty()   
  @Length(6, 20)
  @IsStrongPassword({ message: 'Password is not strong enough' })
  readonly password: String;

  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  readonly name: String;

  // @IsNotEmpty()
  // @Length(2,20)
  // @IsString()
  @IsOptional()
  readonly country: String;

  // @IsNumber()
  @IsOptional()
  readonly winning: number;

  // @IsNumber()
  @IsOptional()
  readonly level: number;

  // @IsNumber()
  // @IsOptional()
  readonly coins: number;

  @IsOptional()
   image: string;
}
