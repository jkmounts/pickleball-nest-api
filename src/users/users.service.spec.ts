import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'nestjs-prisma';
import { prismaMock } from 'src/prismaMock/singleton';

import { userEntities } from './mocks/user.mock';
const mockUser = userEntities[0];

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
    it('should call prisma.user.create', async () => {
      prisma.user.create.mockResolvedValue(mockUser);

      await expect(service.create(mockUser)).resolves.toEqual(mockUser);
      expect(prisma.user.create).toBeCalledTimes(1);
      expect(prisma.user.create).toBeCalledWith({ data: mockUser });
    });
  });

  describe('findAll', () => {
    it('should call prisma.user.findMany', async () => {
      prisma.user.findMany.mockResolvedValue(userEntities);

      await expect(service.findAll()).resolves.toEqual(userEntities);
      expect(prisma.user.findMany).toBeCalledTimes(1);
      expect(prisma.user.findMany).toBeCalledWith();
    });
  });

  describe('findOne', () => {
    it('should call prisma.user.findUniqueOrThrow', async () => {
      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser);

      await expect(service.findOne(1)).resolves.toEqual(mockUser);
      expect(prisma.user.findUniqueOrThrow).toBeCalledTimes(1);
      expect(prisma.user.findUniqueOrThrow).toBeCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('update', () => {
    it('should call prisma.user.update', async () => {
      prisma.user.update.mockResolvedValue(mockUser);

      await expect(service.update(1, mockUser)).resolves.toEqual(mockUser);
      expect(prisma.user.update).toBeCalledTimes(1);
      expect(prisma.user.update).toBeCalledWith({
        where: { id: 1 },
        data: mockUser,
      });
    });
  });

  describe('remove', () => {
    it('should return a string(for now)', async () => {
      expect(service.remove(1)).toEqual('This action removes a #1 user');
    });
  });
});
