import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './store.schema';
import { Users, UsersSchema } from 'src/users/users.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
})
export class StoreModule {}
