import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Body,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard, AuthAdminGuard } from '../auth/local-auth/auth.guard';
import { UserService } from './users.service';
import { Users } from './users.schema';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Request } from 'express';
import { changePasswordDto } from './dtos/changePassword.dto';
import { UserrDto } from './dtos/user.dto';
import mongoose from 'mongoose';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  @UseGuards(AuthGuard)
  async getUser(@Req() data: any): Promise<Users> {
    console.log(data.user);

    const user: Users = await this.userService.getUser(data?.user?._id);
    return user;
  }

  @Post('/user/update')
  @UseGuards(AuthGuard)
  async updateUser(@Body() data: any): Promise<Users> {
    const user: Users = await this.userService.updateUser(data);
    return user;
  }

  @Post('/user')
  @UseGuards(AuthAdminGuard)
  async craeteUser(@Body() data: UserrDto): Promise<Users> {
    const user: Users = await this.userService.craeteUser(data);
    return user;
  }

  @Get('/all')
  @UseGuards(AuthAdminGuard)
  async getAllUsers(): Promise<Users[]> {
    const allUsers: Users[] = await this.userService.getAllUser();
    return allUsers;
  }

  @Post('/password')
  @UseGuards(AuthGuard)
  changePassword(
    @Req() req: any,
    @Body() data: changePasswordDto,
  ): Promise<Users> {
    let { _id } = req.user;
    const user = this.userService.changePassword(_id, data);
    return user;
  }

  @Delete('/user/:id')
  @UseGuards(AuthAdminGuard)
  async deleteUser(@Param() data : any) {
    await this.userService.deleteUser(data.id)
    return "User deleted !!"
  }

  @Get('/user/:id')
  @UseGuards(AuthAdminGuard)
  async getUserData(@Param() data : any) {
    let user = await this.userService.getUserData(data.id)
    return user
  }
}
