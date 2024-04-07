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
} from "@nestjs/common"
import {PaypalService} from "./paypal.service"
import {PaymentDto} from "./dtos/payment-dto"
import {AuthGuard} from "src/auth/local-auth/auth.guard"
import {Response, Request} from "express"
import {CapturePaymentDto} from "./dtos/capture-paypal.dto"
import * as paypal from "@paypal/checkout-server-sdk"
import * as dotenv from "dotenv"
dotenv.config()
@Controller("paypal")
export class PaypalContrller {
  constructor(private readonly paypalService: PaypalService) {}

  @Post("/create-paypal-order")
  @UseGuards(AuthGuard)
  async addPayment(
    @Body() paymentData: PaymentDto,
    @Req() req,
    @Res() res: Response,
  ) {
    const Enviroment =
      process.env.PAYPAL_MODE == "sandbox"
        ? paypal.core.SandboxEnvironment
        : paypal.core.LiveEnvironment
    const paypalClient = new paypal.core.PayPalHttpClient(
      new Enviroment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_SECRET),
    )

    const request = new paypal.orders.OrdersCreateRequest()
    const total: string = paymentData.price.toString() // Convert to string

    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: total,
              },
              discount: {
                currency_code: "USD",
                value: "0.00",
              },
              tax_total: {
                currency_code: "USD",
                value: "0.00",
              },
              handling: {
                currency_code: "USD",
                value: "0.00",
              },
              insurance: {
                currency_code: "USD",
                value: "0.00",
              },
              shipping_discount: {
                currency_code: "USD",
                value: "0.00",
              },
              shipping: {
                currency_code: "USD",
                value: "0.00",
              },
            },
          },
        },
      ],
    })
    try {
      const order = await paypalClient.execute(request)
      res.send({
        id: order.result.id,
      })
    } catch (error) {
      console.log(error)
    }
  }

  @Post("capture-paypal-order")
  @UseGuards(AuthGuard)
  async capturePayment(
    @Body() data: CapturePaymentDto,
    @Res() res: Response,
    @Req() req,
  ) {
    const {jsonResponse, httpStatusCode} =
      await this.paypalService.captureOrder(data, req.user._id)

    res.status(httpStatusCode).json(jsonResponse)
  }
}
