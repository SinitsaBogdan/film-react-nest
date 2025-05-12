import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from '../films.controller';
import { FilmsService } from '../films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn(),
        findScheduleById: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('.findAll() should call findAll method of the service', () => {
    controller.findFilmsAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('.findScheduleById() should call findScheduleById method of the service', () => {
    controller.findFilmScheduleById({ id: '0' });
    expect(service.findScheduleById).toHaveBeenCalled();
  });
});
