import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreateOrderDto } from 'src/order/dto';

@Injectable()
export class OrdersRepository {
  private orders: CreateOrderDto[] = [];
  createOrder(order: Omit<CreateOrderDto, 'id'>): CreateOrderDto {
    this.orders.forEach((element) => {
      element.tickets.forEach((ticket) => {
        if (
          order.tickets.find(
            (item) =>
              item.film === ticket.film &&
              item.daytime === ticket.daytime &&
              item.row === ticket.row &&
              item.seat === ticket.seat,
          )
        ) {
          throw new Error('Билеты с такими данными уже существуют');
        }
      });
    });

    const ticketsWithId = [];
    order.tickets.forEach((item) => {
      ticketsWithId.push({ ...item, id: faker.string.uuid() });
    });

    const newOrder: CreateOrderDto = {
      id: faker.string.uuid(),
      email: order.email,
      phone: order.phone,
      tickets: ticketsWithId,
    };

    this.orders.push(newOrder);

    return newOrder;
  }
}
