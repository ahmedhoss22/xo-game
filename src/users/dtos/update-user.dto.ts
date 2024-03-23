import { PartialType } from '@nestjs/mapped-types'
import { UserrDto } from './user.dto'
export class UpdateUserDto extends PartialType(UserrDto) {}
