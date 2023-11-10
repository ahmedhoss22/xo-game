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

    async getUser(id :mongoose.Types.ObjectId) : Promise<Users>{
        return await this.UserModel.findById(id)
    }

    async updateUser(id :mongoose.Types.ObjectId,data : UpdateUserDto) : Promise<Users>{
        return await this.UserModel.findByIdAndUpdate(id , data,{new:true})
    }

    async getAllUser() : Promise<Users[]>{
        return await this.UserModel.find()
    }

    async changePassword(id :mongoose.Types.ObjectId,data : changePasswordDto) : Promise<Users>{
        let user = await this.UserModel.findById(id)
        user.password = data.password
        return await user.save()
    }

}