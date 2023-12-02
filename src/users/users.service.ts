import {Injectable} from "@nestjs/common"
import { Users } from "./users.schema"
import { InjectModel } from "@nestjs/mongoose"
import mongoose, { Model } from "mongoose"
import { changePasswordDto } from "./dtos/changePassword.dto"
import { UpdateUserDto } from "./dtos/update-user.dto"

@Injectable()
export class UserService{
    constructor(
        @InjectModel(Users.name) private UserModel : Model<Users>
    ){}

    async getUser(id :any) : Promise<Users>{
        return await this.UserModel.findById(id)
    }

    async updateUser(id :any,data : UpdateUserDto) : Promise<Users>{
        return await this.UserModel.findByIdAndUpdate(id , data,{new:true})
    }

    async getAllUser() : Promise<Users[]>{
        return await this.UserModel.find()
    }

    async changePassword(id :any,data : changePasswordDto) : Promise<Users>{
        let user = await this.UserModel.findById(id)
        user.password = data.password
        return await user.save()
    }

    async winnerCoins (id:mongoose.Types.ObjectId , coins:number):Promise<Users>{
        let user = await this.UserModel.findById(id)
        user.coins+= coins 
        return await user.save()
    }

    async loserCoins (id:mongoose.Types.ObjectId , coins:number):Promise<Users>{
        let user = await this.UserModel.findById(id)
        user.coins-= coins 
        return await user.save()
    }

}