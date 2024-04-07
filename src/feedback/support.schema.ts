import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Feedback {
  @Prop({ type: String, required: true, trim: true })
  message: string

  @Prop({ type: Number, required: true, trim: true })
  coins: number
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback)
