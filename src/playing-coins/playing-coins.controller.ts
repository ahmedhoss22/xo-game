import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthAdminGuard } from 'src/auth/local-auth/auth.guard';
import { PlayingCoinsDto } from './dtos/Playing-coins.dto';
import { PlayingCoinsService } from './playing-coins.service';
import { UpdatePlayingCoinsDto } from './dtos/update-playing-coins.dto';

@Controller('playing-coins')
export class PlayingCoinsController {
  constructor(private readonly playingCoinsService: PlayingCoinsService) {}

  @UseGuards(AuthAdminGuard)
  @Post('/')
  async addnewPlayingCoins(@Body() data: PlayingCoinsDto) {
    await this.playingCoinsService.addNewPlayingCoins(data);
    return { message: 'Created !!' };
  }

  @UseGuards(AuthAdminGuard)
  @Get('/all')
  async getPlayingCoins() {
    let data = await this.playingCoinsService.getAllPlayingCoins();
    return data;
  }

  @Post('/update')
  @UseGuards(AuthAdminGuard)
  async updateLevel(@Body() data: UpdatePlayingCoinsDto) {
    await this.playingCoinsService.updatePlayingCoins(data);
    return { message: 'Updated !!' };
  }

  @Delete('/:id')
  @UseGuards(AuthAdminGuard)
  async deleteUser(@Param() data: any) {
    await this.playingCoinsService.deletePlayingCoins(data.id);
    return 'User deleted !!';
  }
}
