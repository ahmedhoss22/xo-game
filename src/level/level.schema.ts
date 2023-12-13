import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Schema()
export class Level {
  @Prop({ type: Number, required: true, trim: true })
  number: Number;

  @Prop({ type: Number, required: true, trim: true })
  coins: number;

  @Prop({ type: String, required: true, trim: true })
  color: string;

  @Prop({ type: String, required: true, trim: true })
  bg: string;
}

export const LevelSchema = SchemaFactory.createForClass(Level)