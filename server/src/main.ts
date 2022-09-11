import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT } = process.env;
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  try {
    await app.listen(PORT || 8000, () =>
      console.log(`Running on port ${PORT}`),
    );
  } catch (err) {
    console.error(err);
  }
}
bootstrap();
