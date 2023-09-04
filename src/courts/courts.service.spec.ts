import { Test, TestingModule } from '@nestjs/testing';
import { CourtsService } from './courts.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from 'src/singleton';

import { courtEntities } from './mocks/courts.mock';
const mockCourt = courtEntities[0];

describe('CourtsService', () => {
  let service: CourtsService;
  let prisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourtsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CourtsService>(CourtsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should call prisma.court.findUniqueOrThrow', async () => {
      prisma.court.findUnique.mockResolvedValue(mockCourt);

      await expect(service.findOne(1, 1)).resolves.toEqual(mockCourt);
      expect(prisma.court.findUnique).toBeCalledTimes(1);
      expect(prisma.court.findUnique).toBeCalledWith({
        where: {
          venueId_courtNumber: {
            venueId: 1,
            courtNumber: 1,
          },
        },
      });
    });
  });
});
