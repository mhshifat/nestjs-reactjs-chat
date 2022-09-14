import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session";
import * as passport from "passport";
import { TypeormStore } from "connect-typeorm/out";
import { Session } from "./utils/typeorm";
import { getRepository } from "typeorm";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session); 
  const { PORT } = process.env;
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  app.use([
    session({
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000,
      },
      store: new TypeormStore().connect(sessionRepository)
    }),
    passport.initialize(),
    passport.session(),
  ])

  try {
    await app.listen(PORT || 8000, () =>
      console.log(`Running on port ${PORT}`),
    );
  } catch (err) {
    console.error(err);
  }
}
bootstrap();
