import { PassportSerializer } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/local-auth/auth.service'
import { Users } from 'src/users/users.schema'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super()
  }

  serializeUser(user: Users, done: Function) {
    done(null, user)
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.googleLogin(payload)
    return user ? done(null, user) : done(null, null)
  }
}
