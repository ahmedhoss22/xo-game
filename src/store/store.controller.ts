import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
  Req,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common'
import { StoreDto } from './dtos/store.dto'
import { StoreService } from './store.service'
import { AuthAdminGuard, AuthGuard } from 'src/auth/local-auth/auth.guard'
import { FileInterceptor } from '@nestjs/platform-express'
import { multerConfig } from 'src/utilites/multerConfig'
import { filterFilter } from 'src/utilites/file-filter'
import { IsNotEmpty, IsOptional } from 'class-validator'
import { UpdateStoreDto } from './dtos/update-store.dto'
import mongoose from 'mongoose'

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('/')
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(
    FileInterceptor('image', multerConfig('./public/store', 'store')),
  ) // Use the file upload interceptor
  async addStore(
    @Body() data: StoreDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
            message: 'File size must be less than 5 mb',
          }),
          new FileTypeValidator({ fileType: '' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file)

    if (!file) {
      throw new BadRequestException({ message: 'Image is required!' })
    }
    data.image = '/store/' + file.filename
    await this.storeService.addStore(data)
    return { message: 'Store Added' }
  }

  @Get('/all')
  @UseGuards(AuthGuard)
  async getAllStores() {
    let stores = await this.storeService.getAllStores()
    return stores
  }

  @Post('/update')
  @UseGuards(AuthAdminGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerConfig('./public/store', 'store').storage,
    }),
  )
  async updateStore(
    @Body() data: UpdateStoreDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5 * 1024 * 1024,
            message: 'File size must be less than 5 MB',
          }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    file: Express.Multer.File,
  ) {
    if (file) {
      data.image = '/store/' + file.filename
    }

    // if (!file && !data.image) {
    //   throw new BadRequestException('Image is required if provided');
    // }

    await this.storeService.updateStore(data._id, data)
    return { message: 'Updated !!' }
  }

  @Delete('/:id')
  @UseGuards(AuthAdminGuard)
  async deleteStore(@Param('id') id: mongoose.Types.ObjectId) {
    await this.storeService.deleteStore(id)
    return { message: 'Store Deleted !!' }
  }
}
