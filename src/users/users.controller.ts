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
  ForbiddenException,
  Response,
} from "@nestjs/common"
import {
  AuthGuard,
  AuthAdminGuard,
  OtpGuard,
  changePasswordGuard,
} from "../auth/local-auth/auth.guard"
import {UserService} from "./users.service"
import {Users} from "./users.schema"
import {UpdateUserDto} from "./dtos/update-user.dto"
import {changePasswordDto} from "./dtos/changePassword.dto"
import {UserrDto} from "./dtos/user.dto"
import mongoose from "mongoose"
import {FileInterceptor} from "@nestjs/platform-express"
import path from "path"
import {ForgetPasswordDto, OtpDto} from "./dtos/forgetPassword"
import {Response as ExpressResponse, Request} from "express"
import {JwtService} from "@nestjs/jwt"
@Controller("/users")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get("/user")
  @UseGuards(AuthGuard)
  async getUser(@Req() data: any): Promise<Users> {
    const user: Users = await this.userService.getUser(data?.user?._id)
    return user
  }

  @Post("/user/update")
  @UseInterceptors(FileInterceptor("image"))
  @UseGuards(AuthGuard)
  async updateUser(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
            message: "File size must be less than 5 mb",
          }),
          new FileTypeValidator({fileType: "image/*"}),
        ],
      }),
    )
    file: // eslint-disable-next-line no-undef
    Express.Multer.File,
    @Body() data: UpdateUserDto,
  ): Promise<Users> {
    if (file) {
      data.image = "/user/" + file.filename
    }
    const user: Users = await this.userService.updateUser(data)
    return user
  }

  @Post("/user")
  @UseGuards(AuthAdminGuard)
  async craeteUser(@Body() data: UserrDto): Promise<Users> {
    const user: Users = await this.userService.craeteUser(data)
    return user
  }

  @Get("/all")
  @UseGuards(AuthAdminGuard)
  async getAllUsers(): Promise<Users[]> {
    const allUsers: Users[] = await this.userService.getAllUser()
    return allUsers
  }

  @Post("/password")
  @UseGuards(AuthGuard)
  async changePassword(@Req() req, @Body() data: changePasswordDto) {
    let {_id} = req.user
    let validPass = await this.userService.comparePassword(
      data.oldPassword,
      req.user.password,
    )
    if (!validPass) {
      throw new ForbiddenException({message: "Invalid old password"})
    }
    const user = this.userService.changePassword(_id, data)
    return user
  }

  @Delete("/user/:id")
  @UseGuards(AuthAdminGuard)
  async deleteUser(@Param() data: any) {
    await this.userService.deleteUser(data.id)
    return "User deleted !!"
  }

  @Get("/user/:id")
  @UseGuards(AuthGuard)
  async getUserData(
    @Param("id", new ValidationPipe({transform: true}))
    id: mongoose.Types.ObjectId,
  ) {
    if (!mongoose.isValidObjectId(id))
      throw new BadRequestException("Inavalid object id")
    let user = await this.userService.getUserData(id)
    return user
  }

  @Post("/forgetPassword")
  async forgotPassword(
    @Body() data: ForgetPasswordDto,
    @Response() res: ExpressResponse,
  ) {
    let validEmail =await this.userService.getUserByEmail(data.email)
    if (!validEmail) {
      throw new BadRequestException({message: "Email is invalid !!"})
    }

    const otp = await this.userService.sendMailOtp(data.email)
    console.log(otp);
    

    const accessToken = await this.jwtService.signAsync(
      {otp, email: data.email},
      {expiresIn: "10min"},
    )
    res.cookie("password_otp", `Baerar ${accessToken}`, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      secure: true,
    })
    res.send()
  }

  @Post("/otp-verify")
  @UseGuards(OtpGuard)
  async verifyOtp(@Body() data: OtpDto, @Req() req, @Response() res: ExpressResponse) {
    console.log(req.data)
    console.log(data)

    if (req.data.otp != data.otp) {
      throw new BadRequestException({message: "Invalid otp"})
    }

    //delete password Token
    res.clearCookie("password_otp")

    const passwordToken = await this.jwtService.signAsync(
      {email: req.data.email , id : req.data.id},
      {expiresIn: "10min"},
    )
    res.cookie("change_password", `Baerar ${passwordToken}`, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      secure: true,
    })
    res.send()
  }

  @Post("/change-forget-password")
  @UseGuards(changePasswordGuard)
  async forgetChangePassword(@Body() data: changePasswordDto, @Req() req, @Response() res: ExpressResponse) {
    let {_id} = req.user
    res.clearCookie("change_password")
    const user = this.userService.changePassword(_id, data)
    res.send(user)

    //delete password Token

  }
}
