import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class PlayingCoins{
    @Prop({required:true})
    name:string

    @Prop({required:true})
    coins:number

    @Prop({required:true})
    rounds:number

    @Prop({required:true})
    winCoins:number
}

export const PlayingCoinsSchema = SchemaFactory.createForClass(PlayingCoins)