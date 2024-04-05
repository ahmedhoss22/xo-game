import {IsNotEmpty, IsString} from "class-validator"

export class ForgetPasswordDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string
}

export class OtpDto {
  @IsString()
  @IsNotEmpty()
  readonly otp: number
}
