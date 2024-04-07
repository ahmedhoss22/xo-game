import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common"
import {Observable} from "rxjs"
import {UsersModule} from "src/users/users.module"
const bcrypt = require("bcryptjs")
import {JwtService} from "@nestjs/jwt"
import {Users, UsersSchema} from "src/users/users.schema"
import {InjectModel} from "@nestjs/mongoose"
import {Model} from "mongoose"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name) private User: Model<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Your authentication logic here
    const request = context.switchToHttp().getRequest()
    let token = request?.cookies?.access_token?.split(" ")[1]

    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      let {id} = await this.jwtService.verify(token)

      if (!id) {
        throw new UnauthorizedException({message: "Not Uthorized user"})
      }

      const user = await this.User.findById(id)

      if (!user) {
        throw new UnauthorizedException({message: "Not Uthorized user"})
      }

      request.user = user

      return true
    } catch (err) {
      throw new UnauthorizedException("Invalid token")
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
    let token = request?.cookies?.access_token?.split(" ")[1]
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      let {id} = await this.jwtService.verify(token)
      const user = await this.User.findById(id)

      if (!user.isAdmin) {
        throw new UnauthorizedException("Route is only for admins !!")
      }

      request.user = user
      return true
    } catch (err) {
      throw new UnauthorizedException("Route is only for admins !!")
    }
  }
}

export class OtpGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name) private User: Model<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Your authentication logic here
    const request = context.switchToHttp().getRequest()
    let token = request?.cookies?.password_otp?.split(" ")[1]

    if (!token) {
      throw new UnauthorizedException({message: "Invalid otp !!"})
    }
    try {
      let {otp, email} = await this.jwtService.verify(token)
      console.log(otp , email);
      
      if (!otp || !email) {
        throw new UnauthorizedException({message: "Invalid otp !!"})
      }

      const user = await this.User.findOne({email})

      if (!user) {
        throw new UnauthorizedException({message: "Invalid otp !!"})
      }

      request.data = {otp, email, id:user._id}

      return true
    } catch (err) {
      throw new UnauthorizedException("Invalid token")
    }
  }
}

export class changePasswordGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Users.name) private User: Model<Users>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Your authentication logic here
    const request = context.switchToHttp().getRequest()
    let token = request?.cookies?.change_password?.split(" ")[1]

    if (!token) {
      throw new UnauthorizedException({message: "Invalid User !!"})
    }
    try {
      let {id, email} = await this.jwtService.verify(token)
      if (!id || !email) {
        throw new UnauthorizedException({message: "Invalid User !!"})
      }

      const user = await this.User.findOne({email})

      if (!user) {
        throw new UnauthorizedException({message: "Invalid user !!"})
      }

      request.user = user

      return true
    } catch (err) {
      throw new UnauthorizedException("Invalid token")
    }
  }
}