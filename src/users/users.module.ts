import { Module } from '@nestjs/common'
import { UserController } from './users.controller'
import { Users, UsersSchema } from './users.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthGuard } from '../auth/local-auth/auth.guard'
import { UserService } from './users.service'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

@Module({
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public/user/',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9)
          const originalName = file.originalname.split('.')[0]
          const extension = file.originalname.split('.').pop()
          const finalName = `${originalName}-${uniqueSuffix}.${extension}`
          callback(null, finalName)
        },
      }),
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
