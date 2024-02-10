import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaymentDto } from './dtos/payment-dto';
import { AuthGuard } from 'src/auth/local-auth/auth.guard';
import { Response } from 'express';
import { CapturePaymentDto } from './dtos/capture-paypal.dto';

@Controller('paypal')
export class PaypalContrller {
  constructor(private readonly paypalService: PaypalService) {}
  enviroment = process.env.PAYPAL_MODE || 'sandox';
  paypal_endpoint =
    this.enviroment == 'sandox'
      ? 'https://api-m.sandbox.paypal.com'
      : 'https://api-m.paypal.com';

  @Post('/create-paypal-order')
  @UseGuards(AuthGuard)
  async addPayment(
    @Body() paymentData: PaymentDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const { jsonResponse, httpStatusCode } =
        await this.paypalService.createOrder(paymentData);
      return res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      throw new InternalServerErrorException({
        message:
          error.message || 'An error occurred while processing the payment.',
      });
    }
  }

  @Post('capture-paypal-order')
  async capturePaymet(@Body() data: any, @Res() res: Response) {
    const { orderID } = data;
    const { jsonResponse, httpStatusCode } =
      await this.paypalService.captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  }
}
