import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { AuthService } from '../local-auth/auth.service'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class GoogleService extends PassportStrategy(Strategy, 'google') {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.API_URL + '/api/auth/google/redirect',
      scope: ['profile', 'email'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    // You can perform operations with the retrieved user profile
    let name = profile.displayName
    let email = profile.emails[0].value
    let image = profile.photos[0].value

    const user = await this.authService.googleLogin({ email, name, image })
    done(null, user)
  }
}
