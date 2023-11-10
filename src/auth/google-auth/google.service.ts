import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleService extends PassportStrategy(Strategy,"google"){
    constructor() {
        super({
          clientID: '547844523533-vaf23vvhoac4fja4lqi3e1rfapbsm6jn.apps.googleusercontent.com',
          clientSecret: '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',
          callbackURL: 'http://localhost:5000/api/auth/google/redirect',
          scope:["profile","email"]
        });
      }
    
      async validate(accessToken: string, refreshToken: string, profile: Profile) {
        // You can perform operations with the retrieved user profile
        console.log("Gooooooooooooooooogle");
        
        console.log(profile,accessToken);
        
        // return {
        //   accessToken,
        //   refreshToken,
        //   profile,
        // };
      }
}
