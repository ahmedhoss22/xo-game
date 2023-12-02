import { Controller, Get, Post, Res, UseGuards, Req } from '@nestjs/common';
import { FacebookAuthGuard } from './facebook.guard';
import { JwtService } from '@nestjs/jwt';
import { Response as ExpressResponse, Request } from 'express';
import { request } from 'http';
import * as dotenv from 'dotenv';

@Controller('auth')
export class  FacebookController {
  constructor(private jwtService: JwtService) {}

  @Get('/facebook/login')
  @UseGuards(FacebookAuthGuard)
  handleLogin() {
    return 'Facebook authentication';
  }

  @Get('facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async handleRedirect(@Req() req, @Res() res: ExpressResponse) {
    dotenv.config();
    const user = req.user;
    const token = await this.jwtService.signAsync({ id: user._id });

    res.cookie('access_token', `Baerar ${token}`, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    const domain = process.env.APP_DOMAIN;
    
    return res.redirect(domain);
  }
}
