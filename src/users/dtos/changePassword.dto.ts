import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { IsStrongPassword } from '../../utilites/password.util'
import { IsEqualTo } from 'src/utilites/equalPasswords.util'

export class changePasswordDto {
  @IsString()
  @IsNotEmpty()
  readonly password: string
  // @IsStrongPassword({ message: 'Password is not strong enough' })

  @IsString()
  @IsNotEmpty()
  @IsEqualTo('password', { message: 'Passwords do not match' })
  readonly rePassword: String

  @IsString()
  @IsOptional()
  @Length(6, 20)
  // @IsStrongPassword({ message: 'Password is not strong enough' })
  readonly oldPassword?: string
}
