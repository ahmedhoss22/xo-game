import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { Users,UsersSchema } from './users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import {AuthGuard} from "../auth/auth.guard"
import { UserService } from './users.service';

@Module({
    controllers:[UserController],
    imports:[
        MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    ],
    providers:[UserService]
})
export class UsersModule {}
