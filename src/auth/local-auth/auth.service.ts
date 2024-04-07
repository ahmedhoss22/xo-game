import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { Users } from 'src/users/users.schema'
import { RegisterDto } from './dtos/register.dto'
import { LoginDto } from './dtos/login.dto'
import { JwtService } from '@nestjs/jwt'
import { ProfileDto } from '../google-auth/dto/userProfile.dto'
const bcrypt = require('bcryptjs')

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel(Users.name) private UsersModel: Model<Users>,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto, admin?: Boolean) {
    const duplicatedEmail = await this.UsersModel.findOne({
      email: data.email,
    })
    if (duplicatedEmail) {
      throw new HttpException(
        'Email address is already registered',
        HttpStatus.CONFLICT,
      )
    }
    console.log(data)

    let newUser = new this.UsersModel({ ...data, isAdmin: admin })
    await newUser.save()
    return { message: 'User Created', data: newUser }
  }

  async login(data: LoginDto) {
    let user = await this.UsersModel.findOne({ email: data.email })

    if (!user) {
      throw new HttpException('Invalid Email or password', HttpStatus.FORBIDDEN)
    }

    let validPassword = await bcrypt.compare(data.password, user.password)
    if (!validPassword) {
      throw new HttpException('Invalid Email or password', HttpStatus.FORBIDDEN)
    }

    return { access_token: await this.jwtService.signAsync({ id: user._id }) }
  }

  async googleLogin(data: ProfileDto) {
    let user = await this.UsersModel.findOne({ email: data.email })

    if (user) return user

    let newUser = new this.UsersModel({ ...data, provider: 'google' })
    return await newUser.save()
  }

  async facebookLogin(data: ProfileDto) {
    let user = await this.UsersModel.findOne({ email: data.email })

    if (user) return user

    let newUser = new this.UsersModel({ ...data, provider: 'facebook' })
    return await newUser.save()
  }

  async findUser(id: mongoose.Types.ObjectId) {
    const user = await this.UsersModel.findById(id)
    return user
  }
}
