import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Param,
  ConflictException,
} from '@nestjs/common';
import { CoinStoreDto } from './dtos/coin-store.dto';
import { CoinStoreService } from './coinStore.service';
import { AuthAdminGuard, AuthGuard } from 'src/auth/local-auth/auth.guard';
import { UpdateCoinStoreDto } from './dtos/update-coin-store.dto';
import mongoose from 'mongoose';

@Controller('coin-store')
export class StoreController {
  constructor(private readonly coinStoreService: CoinStoreService) {}

  @Post('/')
  @UseGuards(AuthAdminGuard)
  async addStore(@Body() data: CoinStoreDto) {
    let dublicatedPrice = await this.coinStoreService.getOneCoinStore({
      price: data.price,
    });
    if (dublicatedPrice)
      throw new ConflictException({ message: 'Price is already added !!' });
    await this.coinStoreService.addCoinStore(data);
    return { message: 'Store Added' };
  }

  @Get('/all')
  @UseGuards(AuthGuard)
  async getAllStores() {
    let stores = await this.coinStoreService.getCoinAllStores();
    return stores;
  }

  @Post('/update')
  @UseGuards(AuthAdminGuard)
  async updateStore(@Body() data: UpdateCoinStoreDto) {
    // if(! data._id) throw new BadRequestException({message:"Object id is required"})
    console.log(data);
    await this.coinStoreService.updateCoinStore(data._id, data);
    return { message: 'Updated !!' };
  }

  @Delete('/:id')
  @UseGuards(AuthAdminGuard)
  async deleteStore(@Param('id') id: mongoose.Types.ObjectId) {
    await this.coinStoreService.deleteCoinStore(id);
    return { message: 'Store Deleted !!' };
  }

  @Get('/:id')
  @UseGuards(AuthAdminGuard)
  async getOneStore(@Param('id') id: mongoose.Types.ObjectId) {
    let dublicatedPrice = await this.coinStoreService.getCoinStore(id);
    return dublicatedPrice;
  }
}
