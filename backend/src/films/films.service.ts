import { Injectable } from '@nestjs/common';
import { FilmsRepository } from './repository/films.repository';
import { ReturnError } from 'src/util/returnError';
import { ReturnItems } from './util/returnItems';
import { GetFilmDto } from './dto/get-film.dto';
import { Schedule } from './repository/schedule.schema';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<ReturnItems<GetFilmDto>> {
    const result = await this.filmsRepository.findAll();
    return { total: result.length, items: result };
  }

  async findScheduleById(
    id: string,
  ): Promise<ReturnItems<Schedule> | ReturnError> {
    try {
      const result = await this.filmsRepository.findFilmById(id);
      if (!result) {
        throw new Error('По указанному id фильма сеансы не найдены');
      }

      return { total: result.schedule.length, items: result.schedule };
    } catch (e) {
      return { error: e.message };
    }
  }
}
