import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
import { ReturnError } from '../util/returnError';
import { CreateTicketDto } from './dto';
import { ReturnItems } from '../films/util/returnItems';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<ReturnItems<CreateTicketDto> | ReturnError> {
    return this.orderService.createOrder(createOrderDto);
  }
}
