import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetFilmDto } from '../films/dto/get-film.dto';
import { Film } from '../films/repository/films.schema';
import { CreateTicketDto } from '../order/dto';

@Injectable()
export class MongodbRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  filmsFindAll(): Promise<GetFilmDto[]> {
    return this.filmModel.find();
  }

  findFilmById(id: string): Promise<GetFilmDto> {
    return this.filmModel.findOne({ id: id });
  }

  async updateFilmScheduleById(
    tickets: CreateTicketDto[],
    films: GetFilmDto[],
  ) {
    for (const ticket of tickets) {
      const taken = `${ticket.row}:${ticket.seat}`;
      const filmItem = films.find((item) => item.id === ticket.film);
      filmItem.schedule.forEach((element) => {
        if (
          element.id === ticket.session &&
          element.daytime === ticket.daytime
        ) {
          element.taken.push(taken);
        }
      });
      await this.filmModel.updateOne(
        { id: ticket.film },
        { $set: { schedule: filmItem.schedule } },
      );
    }
  }
}
