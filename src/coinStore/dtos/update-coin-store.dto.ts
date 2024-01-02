import { PartialType } from '@nestjs/mapped-types';
import {CoinStoreDto  } from './coin-store.dto';
export class UpdateCoinStoreDto extends PartialType(CoinStoreDto) {}
