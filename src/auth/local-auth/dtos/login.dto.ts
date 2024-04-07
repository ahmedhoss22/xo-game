import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  Length,
  IsEmail,
} from 'class-validator'

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: String

  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  readonly password: String
}
