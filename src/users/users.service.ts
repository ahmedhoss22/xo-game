import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { changePasswordDto } from './dtos/changePassword.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserrDto } from './dtos/user.dto';
import * as fs from 'fs';
import * as path from 'path';

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
    const user = await this.UserModel.findById(data._id);
    
    if (!user) {
      // Handle user not found
      throw new NotFoundException('User not found');
    }
    // Check if the image has changed
    console.log(user);
    
    if (data.image) {
      // Delete the old image
      if (user.image && user.image != "/default.png") {
        const oldImagePath = path.join(
          __dirname,
          '..',
          "..",
          'public',
          user.image,
        );
        // Use the file system module to delete the old image
        try {
          fs.unlinkSync(oldImagePath);
        } catch (error) {
          console.log(error.message);
                    
        }
      }
    }

    // Update the user data in the database
    const updatedUser = await this.UserModel.findByIdAndUpdate(data._id, data, {
      new: true,
    });

    return updatedUser;
  }

  async getAllUser(): Promise<Users[]> {
    return await this.UserModel.find();
  }

  async deleteUser(id: mongoose.Types.ObjectId): Promise<Users> {
    return this.UserModel.findByIdAndDelete(id);
  }

  async changePassword(id: any, data: changePasswordDto): Promise<Users> {
    let user = await this.UserModel.findById(id);
    if (user.provider != 'local') {
      return user;
    }
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
