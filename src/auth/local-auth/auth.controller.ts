import { Body, Controller ,Post ,Response ,HttpStatus ,Req} from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthService } from './auth.service';
import {Response as ExpressResponse , Request} from "express"

@Controller("/auth")
export class AuthController{
    constructor(private readonly authService : AuthService){}

    @Post("/register")
    register(@Body() data :RegisterDto){
        console.log(data);
        
        return this.authService.register(data)
    }

    @Post("/admin/register")
    adminRegister(@Body() data :RegisterDto){
        return this.authService.register(data,true)
    }

    @Post("/login")
    async login(@Body() data:LoginDto , @Response() res :ExpressResponse , @Req() request: Request){
        const result =await  this.authService.login(data)
        const token = result.access_token
        res.cookie("access_token",`Baerar ${token}`,{
                maxAge:7 * 24 * 60 * 60 * 1000 ,
                httpOnly:true,
                secure:true,
            })
            res.status(HttpStatus.OK).json({ message: 'Login successful' });
    }
    
}