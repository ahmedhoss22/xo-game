import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { UsersModule } from 'src/users/users.module'
const bcrypt = require('bcryptjs')
import { JwtService } from '@nestjs/jwt'
import { Users, UsersSchema } from 'src/users/users.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name) private User: Model<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Your authentication logic here
    const request = context.switchToHttp().getRequest()
    let token = request?.cookies?.access_token?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      let { id } = await this.jwtService.verify(token)

      if (!id) {
        throw new UnauthorizedException({ message: 'Not Uthorized user' })
      }

      const user = await this.User.findById(id)

      if (!user) {
        throw new UnauthorizedException({ message: 'Not Uthorized user' })
      }

      request.user = user

      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid token')
    }
  }
}

export class AuthAdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name) private User: Model<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Your authentication logic here
    const request = context.switchToHttp().getRequest()
    let token = request?.cookies?.access_token?.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      let { id } = await this.jwtService.verify(token)
      const user = await this.User.findById(id)

      if (!user.isAdmin) {
        throw new UnauthorizedException('Route is only for admins !!')
      }

      request.user = user
      return true
    } catch (err) {
      throw new UnauthorizedException('Route is only for admins !!')
    }
  }
}
