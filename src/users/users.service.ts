import { Injectable } from '@nestjs/common';
import { Users } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { changePasswordDto } from './dtos/changePassword.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserrDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(Users.name) private UserModel: Model<Users>) {}

  async getUser(id: any): Promise<Users> {
    return await this.UserModel.findById(id);
  }

  async craeteUser(data: UserrDto): Promise<Users> {
    let newUser = new this.UserModel(data);
    return newUser.save();
  }

  async updateUser(data: UpdateUserDto): Promise<Users> {
    return await this.UserModel.findByIdAndUpdate(data._id, data, {
      new: true,
    });
  }

  async getAllUser(): Promise<Users[]> {
    return await this.UserModel.find();
  }

  async deleteUser(id: mongoose.Types.ObjectId): Promise<Users> {
    return this.UserModel.findByIdAndDelete(id);
  }

  async changePassword(id: any, data: changePasswordDto): Promise<Users> {
    let user = await this.UserModel.findById(id);
    user.password = data.password;
    return await user.save();
  }

  async winnerCoins(
    id: mongoose.Types.ObjectId,
    coins: number,
  ): Promise<Users> {
    let user = await this.UserModel.findById(id);
    user.coins += coins;
    return await user.save();
  }

  async loserCoins(id: mongoose.Types.ObjectId, coins: number): Promise<Users> {
    let user = await this.UserModel.findById(id);
    user.coins -= coins;
    return await user.save();
  }

  async getUserData(id: mongoose.Types.ObjectId): Promise<Users> {
    return this.UserModel.findById(id);
  }
}
