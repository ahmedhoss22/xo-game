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
  ValidationPipe,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { AuthGuard, AuthAdminGuard } from '../auth/local-auth/auth.guard';
import { UserService } from './users.service';
import { Users } from './users.schema';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Request } from 'express';
import { changePasswordDto } from './dtos/changePassword.dto';
import { UserrDto } from './dtos/user.dto';
import mongoose from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import path from 'path';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  @UseGuards(AuthGuard)
  async getUser(@Req() data: any): Promise<Users> {
    const user: Users = await this.userService.getUser(data?.user?._id);
    return user;
  }

  @Post('/user/update')
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard)
  async updateUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
            message: 'File size must be less than 5 mb',
          }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() data: UpdateUserDto,
  ): Promise<Users> {
    if (file) {
      data.image = '/user/' + file.filename;
    }
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
  async deleteUser(@Param() data: any) {
    await this.userService.deleteUser(data.id);
    return 'User deleted !!';
  }

  @Get('/user/:id')
  @UseGuards(AuthGuard)
  async getUserData(
    @Param('id', new ValidationPipe({ transform: true }))
    id: mongoose.Types.ObjectId,
  ) {
    if (!mongoose.isValidObjectId(id))
      throw new BadRequestException('Inavalid object id');
    let user = await this.userService.getUserData(id);
    return user;
  }
}
