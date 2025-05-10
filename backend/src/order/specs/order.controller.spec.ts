import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrder = {
    email: 'sinitsa.bogdan.1997@yandex.ru',
    phone: '+79992334819',
    tickets: [],
    id: '1',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({ createOrder: jest.fn() })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Функция createOrder() должна вызывать метод CreateOrder сервиса', () => {
    controller.create(mockOrder);
    expect(service.createOrder).toHaveBeenCalled();
  });
});
