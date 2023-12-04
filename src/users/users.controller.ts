import {
  Controller,
  Get,
  UseGuards,
  Req,
  Patch,
  Body,
  Post,
} from '@nestjs/common';
import { AuthGuard, AuthAdminGuard } from '../auth/local-auth/auth.guard';
import { UserService } from './users.service';
import { Users } from './users.schema';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Request } from 'express';
import { changePasswordDto } from './dtos/changePassword.dto';

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

  @Patch('/user')
  @UseGuards(AuthGuard)
  async updateUser(@Req() data: any): Promise<Users> {
    const user: Users = await this.userService.updateUser(
      data?.user._id,
      data.body,
    );
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
}
