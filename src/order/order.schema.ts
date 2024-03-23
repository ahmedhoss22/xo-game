import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'
import { Store } from 'src/store/store.schema'
import { Users } from 'src/users/users.schema'

@Schema()
export class Order {
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
    ref: 'Users',
  })
  user: Users

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
    ref: 'Store',
  })
  product: Store
}

export const OrderSchema = SchemaFactory.createForClass(Order)
