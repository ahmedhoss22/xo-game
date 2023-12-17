import { Module } from '@nestjs/common';
import { MyGatway } from './gatway';
import { RoomsService } from './rooms.service';
import { UserService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UtilitsService } from './utiltis.service';

@Module({
  imports: [UsersModule],
  providers: [MyGatway, RoomsService, UtilitsService],
  controllers: [],
})
export class GatwayModule {}
