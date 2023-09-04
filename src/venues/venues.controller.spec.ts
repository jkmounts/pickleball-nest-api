import { Test, TestingModule } from '@nestjs/testing';
import { VenuesController } from './venues.controller';
import { VenuesService } from './venues.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from 'src/singleton';

import { venueEntities } from './mocks/venues.mock';
const mockVenue = venueEntities[0];

describe('VenuesController', () => {
  let controller: VenuesController;
  let service: VenuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenuesController],
      providers: [
        VenuesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get<VenuesController>(VenuesController);
    service = module.get<VenuesService>(VenuesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should call VenuesService.create', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockVenue);
      await controller.create(mockVenue);
      expect(service.create).toBeCalledTimes(1);
      expect(service.create).toBeCalledWith(mockVenue);
    });
  });

  describe('findAll', () => {
    it('should call VenuesService.findAll', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(venueEntities);
      await controller.findAll();
      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toBeCalledWith();
    });
  });

  describe('findOne', () => {
    it('should call VenuesService.findOne', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockVenue);
      await controller.findOne(1);
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toBeCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call VenuesService.update', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockVenue);
      await controller.update(1, mockVenue);
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(1, mockVenue);
    });
  });

  describe('remove', () => {
    it('should call VenuesService.remove', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockVenue);
      await controller.remove(1);
      expect(service.remove).toBeCalledTimes(1);
      expect(service.remove).toBeCalledWith(1);
    });
  });
});
