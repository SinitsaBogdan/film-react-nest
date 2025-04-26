import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DatabaseModule } from './database/database.module';

import { ConfigModule } from '@nestjs/config';
import { configProvider } from './app.config.provider';
import * as path from 'node:path';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configProvider],
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
    }),
    DatabaseModule.forRootAsync(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
