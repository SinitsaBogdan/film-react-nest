import { Injectable } from '@nestjs/common';
import { DatabaseRepository } from '../../database/database.repository';
import { GetFilmDto } from '../dto/get-film.dto';
import { CreateTicketDto } from '../../order/dto/create-ticket.dto';

@Injectable()
export class FilmsRepository {
  constructor(private databaseRepository: DatabaseRepository) {}

  findAll(): Promise<GetFilmDto[]> {
    return this.databaseRepository.filmsFindAll();
  }

  findFilmById(id: string): Promise<GetFilmDto> {
    return this.databaseRepository.findFilmById(id);
  }

  updateFilmSchedules(tikets: CreateTicketDto[], films?: GetFilmDto[]) {
    return this.databaseRepository.updateFilmSchedules(tikets, films);
  }
}
