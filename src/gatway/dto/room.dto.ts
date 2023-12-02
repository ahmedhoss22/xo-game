import mongoose from "mongoose";

export interface RoomDto {
    readonly userID1: mongoose.Types.ObjectId;
    readonly userID2: mongoose.Types.ObjectId;
    readonly socketID1: string;
    readonly socketID2: string;
    readonly roomName: string;
    readonly coins: number;
    readonly player1Moves :number[]
    readonly player2Moves :number[]
     turn :number 

 }