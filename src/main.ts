import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import * as cors from "cors"
import * as express from 'express';
import {NestExpressApplication} from "@nestjs/platform-express"
import {join} from "path"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  dotenv.config();
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useStaticAssets(join(__dirname,"..","public"),{});


  //sessions
  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      },
    }),
  );
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.use(cors({
    origin:process.env.APP_DOMAIN || '*',
    credentials:true
  }))
  // app.enableCors({
  //   // origin: process.env.APP_DOMAIN,
  //   origin: process.env.APP_DOMAIN || '*',
  //   // credentials: true,
  //   credentials: true,
  // });

  

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [
            `'self'`,
            'data:',
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [
            `'self'`,
            'apollo-server-landing-page.cdn.apollographql.com',
          ],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    }),
  );

  await app.listen(5000);
}
bootstrap();
