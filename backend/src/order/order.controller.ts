import { Body, Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
import { ReturnError } from 'src/util/returnError';

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/')
  create(@Body() createOrderDto: CreateOrderDto): CreateOrderDto | ReturnError {
    return this.orderService.createOrder(createOrderDto);
  }
}
