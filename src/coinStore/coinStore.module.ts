import { Module } from '@nestjs/common';
import { StoreController } from './coinStore.controller';
import { CoinStoreService } from './coinStore.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinStore,CoinStoreSchema } from './coinStore.schema';
import { Users, UsersSchema } from 'src/users/users.schema';

@Module({
  controllers: [StoreController],
  providers: [CoinStoreService],
  imports: [
    MongooseModule.forFeature([{ name: CoinStore.name, schema: CoinStoreSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
})
export class CoinStoreModule {}
