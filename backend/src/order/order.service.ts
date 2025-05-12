import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../films/repository/films.repository';
import { OrdersRepository } from './repository/orders.repository';
import { CreateOrderDto, CreateTicketDto } from './dto';
import { ReturnError } from '../util/returnError';
import { ReturnItems } from '../films/util/returnItems';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmsRepository: FilmsRepository,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  async createOrder(
    createOrderDto: Omit<CreateOrderDto, 'id'>,
  ): Promise<ReturnItems<CreateTicketDto> | ReturnError> {
    try {
      const films = [];
      for (const film of createOrderDto.tickets) {
        const result = await this.filmsRepository.findFilmById(film.film);
        films.push(result);
      }

      for (const film of films) {
        for (const schedule of film.schedule) {
          for (const ticket of createOrderDto.tickets) {
            if (
              schedule.id === ticket.session &&
              schedule.daytime === ticket.daytime &&
              schedule.taken.find(
                (item) => item === `${ticket.row}:${ticket.seat}`,
              )
            ) {
              throw new Error('Билеты с такими данными уже существует');
            }
          }
        }
      }
      const result = await this.ordersRepository.createOrder(createOrderDto);

      await this.filmsRepository.updateFilmSchedules(
        createOrderDto.tickets,
        films,
      );

      return {
        total: result.tickets.length,
        items: result.tickets,
      };
    } catch (e) {
      return { error: e.message };
    }
  }
}
