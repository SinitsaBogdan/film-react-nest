import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { ReturnItems } from './util/returnItems';
import { GetFilmDto } from './dto/get-film.dto';
import { Schedule } from './repository/schedule.schema';
import { FindIdParams } from '../util/findIdParams';
import { ReturnError } from '../util/returnError';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findFilmsAll(): Promise<ReturnItems<GetFilmDto>> {
    return this.filmsService.findAll();
  }

  @Get('/:id/schedule')
  async findFilmScheduleById(
    @Param() params: FindIdParams,
  ): Promise<ReturnItems<Schedule> | ReturnError> {
    return this.filmsService.findScheduleById(params.id);
  }
}
