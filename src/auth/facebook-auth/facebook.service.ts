import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy, VerifyCallback } from 'passport-facebook'
import { AuthService } from '../local-auth/auth.service'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class FacebookService extends PassportStrategy(Strategy, 'facebook') {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.API_URL + '/api/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'emails', 'photos'],
      scope: ['profile', 'email'],
    })
  }

  // async validate(
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: Profile,
  //   done: VerifyCallback,
  // ) {
  //   // You can perform operations with the retrieved user profile
  //   let name = profile.displayName;
  //   let email = profile.emails[0].value;
  //   let image = profile.photos[0].value;

  //   const user = await this.authService.googleLogin({ email, name, image });
  //   done(null, user);
  // }
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<any> {
    try {
      // Extract necessary information from the Facebook profile
      const { id, displayName, emails, photos } = profile
      const email = emails && emails.length > 0 ? emails[0].value : null
      const photoUrl = photos && photos.length > 0 ? photos[0].value : null

      // Your authentication logic here
      const user = await this.authService.googleLogin({
        name: displayName,
        email,
        image: photos,
      })

      // If the user is found, return the user object
      if (user) {
        done(null, user)
      } else {
        // If the user is not found, you can create a new user or handle it as needed
        done(new UnauthorizedException('User not authorized'), null)
      }
    } catch (error) {
      // Handle unexpected errors
      done(error, null)
    }
  }
}
