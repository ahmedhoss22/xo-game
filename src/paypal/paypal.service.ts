import {Injectable} from "@nestjs/common"
import paypal from "./paypal.config"
// import fetch from 'node-fetch';
import("node-fetch")
  .then((fetch) => {
    // Your code that uses 'fetch' goes here
  })
  .catch((error) => {
    // Handle errors
    console.error("Error importing node-fetch:", error)
  })
import * as dotenv from "dotenv"
import {Paypal} from "./paypal.schema"
import mongoose, {Model} from "mongoose"
import {InjectModel} from "@nestjs/mongoose"
import {CapturePaymentDto} from "./dtos/capture-paypal.dto"
import {Users} from "src/users/users.schema"

@Injectable()
export class PaypalService {
  constructor(
    @InjectModel(Paypal.name) private Paypal: Model<Paypal>,
    @InjectModel(Users.name) private User: Model<Users>,
  ) {}

  enviroment = process.env.PAYPAL_MODE || "sandox"
  PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID
  PAYPAL_CLIENT_SECRET = process.env.PAYPAL_SECRET
  paypal_endpoint = process.env.PAYPAL_URL

  async generateAccessToken() {
    try {
      if (!this.PAYPAL_CLIENT_ID || !this.PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS")
      }
      const auth = Buffer.from(
        this.PAYPAL_CLIENT_ID + ":" + this.PAYPAL_CLIENT_SECRET,
      ).toString("base64")

      const body = new URLSearchParams()
      body.append("grant_type", "client_credentials")

      const response = await fetch(
        `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
        {
          method: "POST",
          body: body.toString(),
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data: any = await response.json()

      if (!data.access_token) {
        throw new Error(`Access token not received: ${JSON.stringify(data)}`)
      }

      return data.access_token
    } catch (error) {
      console.error("Failed to generate Access Token:", error.message)
      throw error
    }
  }

  async captureOrder(data: CapturePaymentDto, user: mongoose.Types.ObjectId) {
    const accessToken = await this.generateAccessToken()
    const url = `${this.paypal_endpoint}/v2/checkout/orders/${data.orderID}/capture`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    let newPayment = new this.Paypal({...data, user})
    await newPayment.save()

    let userData = await this.User.findById(user)
    userData.coins += data.coins
    await userData.save()

    return this.handleResponse(response)
  }

  async handleResponse(response) {
    try {
      const jsonResponse = await response.json()

      return {
        jsonResponse,
        httpStatusCode: response.status,
      }
    } catch (err) {
      const errorMessage = await response.text()
      throw new Error(errorMessage)
    }
  }
}
