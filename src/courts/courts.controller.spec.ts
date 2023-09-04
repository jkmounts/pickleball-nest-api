import { Test, TestingModule } from '@nestjs/testing';
import { CourtsController } from './courts.controller';
import { CourtsService } from './courts.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from 'src/singleton';

import { courtEntities } from './mocks/courts.mock';
const mockCourt = courtEntities[0];

describe('CourtsController', () => {
  let controller: CourtsController;
  let service: CourtsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtsController],
      providers: [
        CourtsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    controller = module.get<CourtsController>(CourtsController);
    service = module.get<CourtsService>(CourtsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should call CourtsService.findOne', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockCourt);
      await controller.findOne(1, 1);
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toBeCalledWith(1, 1);
    });
  });
});
