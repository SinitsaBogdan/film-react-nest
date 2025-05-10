import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseRepository } from './database.repository';
import { PostgresRepository } from './postgresql.repository';
import { MongodbRepository } from './mongodb.repository';
import { OrderController } from '../order/order.controller';
import { FilmsController } from '../films/films.controller';
import { OrderService } from '../order/order.service';
import { FilmsService } from '../films/films.service';
import { OrdersRepository } from '../order/repository/orders.repository';
import { FilmsRepository } from '../films/repository/films.repository';
import { Films } from '../films/entities/film.entity';
import { Schedules } from '../films/entities/schedule.entity';
import { Film, FilmSchema } from '../films/repository/films.schema';

@Module({})
export class DatabaseModule {
  static forRootAsync(): DynamicModule {
    const databaseType = process.env.DATABASE_DRIVER || 'mongodb';
    const databaseImports = [];
    const databaseProviders = [];
    databaseProviders.push(
      OrdersRepository,
      OrderService,
      FilmsRepository,
      FilmsService,
      DatabaseRepository,
    );
    switch (databaseType) {
      case 'postgres':
        databaseImports.push(
          TypeOrmModule.forFeature([Films, Schedules]),
          TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
              type: 'postgres',
              host: config.get<string>('database.url'),
              port: config.get<number>('database.port'),
              username: config.get<string>('database.username'),
              password: config.get<string>('database.password'),
              database: config.get<string>('database.name'),
              entities: [Films, Schedules],
              synchronize: true,
            }),
            inject: [ConfigService],
          }),
        );
        databaseProviders.push(PostgresRepository);
        break;
      case 'mongodb':
        databaseImports.push(
          MongooseModule.forFeature([
            {
              name: Film.name,
              schema: FilmSchema,
            },
          ]),
          MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
              return {
                uri: `mongodb://${config.get<string>('database.url')}:${config.get<number>('database.port')}/${config.get<string>('database.name')}`,
              };
            },
            inject: [ConfigService],
          }),
        );
        databaseProviders.push(MongodbRepository);
        break;
    }
    return {
      module: DatabaseModule,
      imports: databaseImports,
      providers: databaseProviders,
      controllers: [OrderController, FilmsController],
    };
  }
}
