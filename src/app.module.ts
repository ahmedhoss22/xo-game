import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/local-auth/auth.module';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaypalModule } from './paypal/paypal.module';
import * as dotenv from 'dotenv';
import { GatwayModule } from './gatway/gatway.module';
import { LevelModule } from './level/level.module';
import { PlayingCoinsModule } from './playing-coins/playing-coins.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PaypalModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/xo-game'),
    GatwayModule,
    LevelModule,
    PlayingCoinsModule,
    
  ],
  providers: [Logger],
})
export class AppModule {
  constructor() {
    dotenv.config();
  }
}
