import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CoinStore {
  @Prop({ type: Number, required: true, trim: true })
  price: number;

}

export const CoinStoreSchema = SchemaFactory.createForClass(CoinStore);
