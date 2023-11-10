import { Controller, Get, Post ,UseGuards} from '@nestjs/common';
import { GoogleAuthGuard } from './google.guard';

@Controller('auth')
export class GoogleController {

    @Get("/google/login")
    @UseGuards(GoogleAuthGuard)
    handleLogin(){
        return "Google authentication"
    }

    @Get("google/redirect")
    @UseGuards(GoogleAuthGuard)
    handleRedirect(){
        return "ok"
    }

}
