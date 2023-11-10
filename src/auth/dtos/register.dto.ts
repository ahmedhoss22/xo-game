import { IsDecimal, IsNotEmpty, IsString, Length, IsEmail, IsNumber, IsPositive ,IsOptional} from "class-validator";
import { IsStrongPassword } from "../../utilites/password.util";
import mongoose from "mongoose";

export class RegisterDto {

   readonly _id:mongoose.Types.ObjectId; 

   @IsEmail()
   @IsNotEmpty({message:"Email is required !!"})
   readonly email: String;

   @IsString()
   @IsNotEmpty()
   @Length(6, 20)
   @IsStrongPassword({ message: 'Password is not strong enough' })
   readonly password: String;
 
   @IsString()
   @IsNotEmpty()
   @Length(2, 20)
   readonly name: String;

   @IsString()
   @IsNotEmpty()
   @Length(2,20)
   readonly country:String;
}