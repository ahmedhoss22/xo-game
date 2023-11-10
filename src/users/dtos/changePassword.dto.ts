import {  IsNotEmpty, IsString, Length} from "class-validator";
import { IsStrongPassword } from "../../utilites/password.util";
import { IsEqualTo } from "src/utilites/equalPasswords.util";

export class changePasswordDto {

   @IsString()
   @IsNotEmpty()
   @Length(6, 20)
   @IsStrongPassword({ message: 'Password is not strong enough' })
   readonly password: string;
 
   @IsString()
   @IsNotEmpty()
   @Length(6, 20)
   @IsEqualTo('password', { message: 'Passwords do not match' })
   readonly rePassword: String;

}