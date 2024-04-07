import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class ProfileDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @IsString()
  readonly image: string
}
