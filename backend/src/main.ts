import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as process from 'node:process';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.PREFIX || 'api/afisha');
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
