import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common"
import {Users} from "./users.schema"
import {InjectModel} from "@nestjs/mongoose"
import mongoose, {Model} from "mongoose"
import {changePasswordDto} from "./dtos/changePassword.dto"
import {UpdateUserDto} from "./dtos/update-user.dto"
import {UserrDto} from "./dtos/user.dto"
import * as fs from "fs"
import * as path from "path"
const bcrypt = require("bcryptjs")
import {Resend} from "resend"
import { error } from "console"

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private UserModel: Model<Users>) {}

  async getUser(id: any): Promise<Users> {
    return await this.UserModel.findById(id)
  }

  async craeteUser(data: UserrDto): Promise<Users> {
    let newUser = new this.UserModel(data)
    return newUser.save()
  }

  async updateUser(data: UpdateUserDto): Promise<Users> {
    const user = await this.UserModel.findById(data._id)

    if (!user) {
      throw new NotFoundException("User not found")
    }
    if (data.image) {
      if (user.image && user.image != "/default.png") {
        const oldImagePath = path.join(
          __dirname,
          "..",
          "..",
          "public",
          user.image,
        )
        // Use the file system module to delete the old image
        try {
          fs.unlinkSync(oldImagePath)
        } catch (error) {
          console.log(error.message)
        }
      }
    }

    // Update the user data in the database
    const updatedUser = await this.UserModel.findByIdAndUpdate(data._id, data, {
      new: true,
    })

    return updatedUser
  }

  async getAllUser(): Promise<Users[]> {
    return await this.UserModel.find()
  }

  async deleteUser(id: mongoose.Types.ObjectId): Promise<Users> {
    return this.UserModel.findByIdAndDelete(id)
  }

  async changePassword(id: any, data: changePasswordDto): Promise<Users> {
    let user = await this.UserModel.findById(id)
    if (user.provider != "local") {
      return user
    }
    user.password = data.password
    return await user.save()
  }

  async winnerCoins(
    id: mongoose.Types.ObjectId,
    coins: number,
  ): Promise<Users> {
    let user = await this.UserModel.findById(id)
    user.coins += coins
    return await user.save()
  }

  async loserCoins(id: mongoose.Types.ObjectId, coins: number): Promise<Users> {
    let user = await this.UserModel.findById(id)
    user.coins -= coins
    return await user.save()
  }

  async getUserData(id: mongoose.Types.ObjectId): Promise<Users> {
    return this.UserModel.findById(id)
  }

  async comparePassword(password, hashed) {
    let validPassword = await bcrypt.compare(password, hashed)
    return validPassword
  }

  async sendMailOtp(email: string) {
    const resend = new Resend("re_bV7v7VxH_LzwD5C8uRHigvFqL6UTNjEdw")
    resend.apiKeys.create({name :"Matchxo"})
    const otp = Math.floor(1000 + Math.random() * 9000).toString()

    console.log(email);
    
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Forget Password",
      html: `
      <h1>Welcome to matchxo </h1>
      <p>You can visit our website form  <a href="https://matchxo.com/">here</a></p>
      <p>This is the otp (Valid for only 10 min): <h2> <strong>${otp}</strong></h2></p>`,
    })
    if (error) {
      return console.error({ error });
    }
    return otp
  }

  getUserByEmail(email: string) {
    return this.UserModel.findOne({email , provider:"local"})
  }

}
