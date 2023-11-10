import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Users, UsersSchema } from './../users/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import {constans} from "./auth.constants" 
import { GoogleController } from './google-auth/google.controller';
import { GoogleService } from './google-auth/google.service';

@Module({
    controllers:[AuthController , GoogleController],
    providers:[AuthService ,GoogleService ],
    imports:[
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    JwtModule.register({
      global: true,
      secret: constans.secret,
      signOptions: { expiresIn: '2d' },
    }),
    ]
})
export class AuthModule {}
