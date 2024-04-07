import {IsNotEmpty, IsNumber, IsString} from "class-validator"

export class CapturePaymentDto {
  @IsString()
  @IsNotEmpty()
  readonly orderID: string

  @IsNumber()
  @IsNotEmpty()
  readonly price: number

  @IsNumber()
  @IsNotEmpty()
  readonly coins: number
}
