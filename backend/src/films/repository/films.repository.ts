import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './films.schema';
import { GetFilmDto } from 'src/films/dto/get-film.dto';
import { Schedule } from './schedule.schema';

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  findAll(): Promise<GetFilmDto[]> {
    return this.filmModel.find();
  }

  findFilmById(id: string): Promise<GetFilmDto> {
    return this.filmModel.findOne({ id: id });
  }

  updateFilmScheduleById(id: string, schedule: Schedule[]) {
    return this.filmModel.updateOne(
      { id: id },
      { $set: { schedule: schedule } },
    );
  }
}
