import { Module } from '@nestjs/common';
import { PlayingCoinsController } from './playing-coins.controller';
import { PlayingCoinsService } from './playing-coins.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayingCoins, PlayingCoinsSchema } from './playing-coins.shema';
import { UsersModule } from 'src/users/users.module';
import { Users, UsersSchema } from 'src/users/users.schema';

@Module({
  controllers: [PlayingCoinsController],
  providers: [PlayingCoinsService],
  imports:[
    MongooseModule.forFeature([{name:PlayingCoins.name , schema : PlayingCoinsSchema}]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ]
})
export class PlayingCoinsModule {}
