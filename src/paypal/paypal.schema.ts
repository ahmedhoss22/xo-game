import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import mongoose, {Model} from "mongoose"

@Schema({timestamps: true})
export class Paypal {
  @Prop({type: Number, required: true, trim: true})
  price: Number

  @Prop({type: String, required: true, trim: true})
  orderID: String

  @Prop({type: Number, required: true, trim: true})
  coins: Number

  @Prop({type: mongoose.Types.ObjectId, ref: "users", required: true})
  user: mongoose.Types.ObjectId
}

export const PaypalSchema = SchemaFactory.createForClass(Paypal)
