import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users, UsersSchema } from '../../users/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { GoogleController } from '../google-auth/google.controller';
import { GoogleService } from '../google-auth/google.service';
import * as dotenv from 'dotenv';
import { SessionSerializer } from 'src/utilites/Serializer';
import { PassportModule } from '@nestjs/passport';
import { FacebookController } from '../facebook-auth/facebook.controller';
import { FacebookService } from '../facebook-auth/facebook.service';

dotenv.config();

@Module({
  controllers: [AuthController, GoogleController, FacebookController],
  providers: [AuthService, GoogleService, SessionSerializer, FacebookService],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    PassportModule.register({ session: true }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20d' },
    }),
  ],
})
export class AuthModule {}
