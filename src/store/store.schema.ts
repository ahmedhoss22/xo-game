import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Store {
  @Prop({ type: Number, required: true, trim: true })
  cost: number;    

  @Prop({ type: String, required: true, trim: true })
  image: string;

  @Prop({ type: String, trim: true })
  name: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
