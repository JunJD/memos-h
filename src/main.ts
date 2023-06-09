import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
// import * as fs from 'fs';

import { AppModule } from './app.module';

async function bootstrap() {
  // 配置 ssl
  // const keyFile = fs.readFileSync(__dirname + '/../ssl/key.pem');
  // const certFile = fs.readFileSync(__dirname + '/../ssl/file.crt');

  // const app = await NestFactory.create(AppModule, {
  //   httpsOptions: {
  //     key: keyFile,
  //     cert: certFile,
  //   },
  // });
  const app = await NestFactory.create(AppModule);

  // const origins = JSON.parse(process.env.LSC_CORS_ORIGIN)
  // const origins = ['http://localhost:9090', 'http://127.0.0.1:5500'];

  app.enableCors({
    // origin: origins,
    origin: '*',
    credentials: true,
    // "allowedHeaders":['Authorization','content-type'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: 'dingjunjie12138',
      name: 'dingjunjie-session',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 3600 * 24 * 30, sameSite: 'none', secure: true },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(9090);
}
bootstrap();
