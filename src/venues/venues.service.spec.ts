import { Test, TestingModule } from '@nestjs/testing';
import { VenuesService } from './venues.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from 'src/singleton';

import { venueEntities } from './mocks/venues.mock';
const mockVenue = venueEntities[0];

describe('VenuesService', () => {
  let service: VenuesService;
  let prisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VenuesService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<VenuesService>(VenuesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.venue.create', async () => {
      prisma.venue.create.mockResolvedValue(mockVenue);

      await expect(service.create(mockVenue)).resolves.toEqual(mockVenue);
      expect(prisma.venue.create).toBeCalledTimes(1);
      expect(prisma.venue.create).toBeCalledWith({ data: mockVenue });
    });
  });

  describe('findAll', () => {
    it('should call prisma.venue.findMany', async () => {
      prisma.venue.findMany.mockResolvedValue(venueEntities);

      await expect(service.findAll()).resolves.toEqual(venueEntities);
      expect(prisma.venue.findMany).toBeCalledTimes(1);
      expect(prisma.venue.findMany).toBeCalledWith({
        include: { courts: true },
      });
    });
  });

  describe('findOne', () => {
    it('should call prisma.venue.findUniqueOrThrow', async () => {
      prisma.venue.findUniqueOrThrow.mockResolvedValue(mockVenue);

      await expect(service.findOne(1)).resolves.toEqual(mockVenue);
      expect(prisma.venue.findUniqueOrThrow).toBeCalledTimes(1);
      expect(prisma.venue.findUniqueOrThrow).toBeCalledWith({
        where: { id: 1 },
        include: { courts: true },
      });
    });
  });

  describe('update', () => {
    it('should call prisma.venue.update', async () => {
      prisma.venue.update.mockResolvedValue(mockVenue);

      await expect(service.update(1, mockVenue)).resolves.toEqual(mockVenue);
      expect(prisma.venue.update).toBeCalledTimes(1);
      expect(prisma.venue.update).toBeCalledWith({
        where: { id: 1 },
        data: mockVenue,
      });
    });
  });

  describe('remove', () => {
    it('should call prisma.venue.delete', async () => {
      prisma.venue.delete.mockResolvedValue(mockVenue);

      await expect(service.remove(1)).resolves.toEqual(mockVenue);
      expect(prisma.venue.delete).toBeCalledTimes(1);
      expect(prisma.venue.delete).toBeCalledWith({ where: { id: 1 } });
    });
  });
});
