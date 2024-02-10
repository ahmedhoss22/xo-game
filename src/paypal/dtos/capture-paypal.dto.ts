import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CapturePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly orderID: number;

}
