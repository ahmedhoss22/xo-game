import { PartialType } from '@nestjs/mapped-types';
import { RegisterDto } from './../../auth/dtos/register.dto';

export class UpdateUserDto extends PartialType(RegisterDto){} 