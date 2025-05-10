import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

import { DevLogger } from './loggers/DevLogger.service';
import { JsonLogger } from './loggers/JsonLogger.service';
import { TskvLogger } from './loggers/TskvLogger.service';

import * as process from 'node:process';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggerType = process.env.LOGGER || 'dev';

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.PREFIX || 'api/afisha');
  app.enableCors();

  switch (loggerType) {
    case 'dev':
      app.useLogger(new DevLogger());
      break;
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
