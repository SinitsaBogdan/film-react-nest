import { Injectable, Optional } from '@nestjs/common';
import { PostgresRepository } from './postgresql.repository';
import { MongodbRepository } from './mongodb.repository';
import { ConfigService } from '@nestjs/config';
import { GetFilmDto } from 'src/films/dto/get-film.dto';
import { CreateTicketDto } from 'src/order/dto';

@Injectable()
export class DatabaseRepository {
  private databaseType: string;
  constructor(
    @Optional() private postgresRepository: PostgresRepository,
    @Optional() private mongodbRepository: MongodbRepository,
    private config: ConfigService,
  ) {
    this.databaseType = config.get<string>('database.driver');
  }

  async filmsFindAll(): Promise<GetFilmDto[]> {
    switch (this.databaseType) {
      case 'postgres':
        return await this.postgresRepository.filmsFindAll();
      case 'mongodb':
        return await this.mongodbRepository.filmsFindAll();
    }
  }

  async findFilmById(id: string): Promise<GetFilmDto> {
    switch (this.databaseType) {
      case 'postgres':
        return await this.postgresRepository.findFilmById(id);
      case 'mongodb':
        return await this.mongodbRepository.findFilmById(id);
    }
  }

  async updateFilmSchedules(tikets: CreateTicketDto[], films?: GetFilmDto[]) {
    switch (this.databaseType) {
      case 'postgres':
        return await this.postgresRepository.updateFilmSchedules(tikets);
      case 'mongodb':
        return await this.mongodbRepository.updateFilmScheduleById(
          tikets,
          films,
        );
    }
  }
}
