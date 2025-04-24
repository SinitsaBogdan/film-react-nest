import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configProvider } from './app.config.provider';
import * as path from 'node:path';

import { Film, FilmSchema } from './films/repository/films.schema';
import { FilmsController } from './films/films.controller';
import { FilmsRepository } from './films/repository/films.repository';
import { FilmsService } from './films/films.service';

import { OrdersRepository } from './order/repository/orders.repository';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';

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
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get<string>('database.url'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Film.name,
        schema: FilmSchema,
      },
    ]),
  ],
  controllers: [OrderController, FilmsController],
  providers: [OrdersRepository, OrderService, FilmsRepository, FilmsService],
})
export class AppModule {}
