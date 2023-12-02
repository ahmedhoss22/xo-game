import { Module } from '@nestjs/common';
import { MyGatway } from './gatway';
import { RoomsService } from './rooms.service';
import { UserService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [MyGatway, RoomsService, ],
  controllers: [],
})
export class GatwayModule {}
