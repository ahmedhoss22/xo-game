import { Module } from '@nestjs/common';
import { LevelController } from './level.controller';
import { LevelService } from './level.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Level, LevelSchema } from './level.schema';
import { Users, UsersSchema } from 'src/users/users.schema';

@Module({
  controllers: [LevelController],
  providers: [LevelService],
  imports: [
    MongooseModule.forFeature([{ name: Level.name, schema: LevelSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
})
export class LevelModule {}
