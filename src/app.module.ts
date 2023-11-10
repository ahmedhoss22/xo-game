import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaypalModule } from './paypal/paypal.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PaypalModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/xo-game'),
  ],
  providers:[Logger]
})
export class AppModule {

}
