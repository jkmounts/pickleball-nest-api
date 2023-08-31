import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from 'src/singleton';

import mockUser from './entities/user.mock';

describe('UsersService', () => {
  let service: UsersService;
  let prisma;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call prisma.create', async () => {
      prisma.user.create.mockResolvedValue(mockUser);

      await expect(service.create(mockUser)).resolves.toEqual(mockUser);
      expect(prisma.user.create).toBeCalledTimes(1);
      expect(prisma.user.create).toBeCalledWith({ data: mockUser });
    });
  });
});
