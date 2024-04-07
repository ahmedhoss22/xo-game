import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class PaymentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly price: number

  @IsString()
  // @IsNotEmpty()
  readonly currency: string
}
