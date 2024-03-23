import { AuthGuard } from '@nestjs/passport'
import { ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean

    if (!activate) {
      throw new Error('Google authentication failed')
    }

    const request = context.switchToHttp().getRequest()
    await super.logIn(request)
    return activate
  }
}
