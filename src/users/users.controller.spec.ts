import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { prismaMock } from 'src/prismaMock/singleton';
import { PrismaService } from 'nestjs-prisma';

describe('UsersController', () => {
  let controller: UsersController;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call UsersService.create', async () => {
      jest.spyOn(service, 'create').mockResolvedValue('test');
      const userDto = {
        name: 'Jim',
        email: 'jim@example.com',
      };
      await controller.create(userDto);
      expect(service.create).toBeCalledTimes(1);
      expect(service.create).toBeCalledWith(userDto);
    });
  });

  describe('findAll', () => {
    it('should call UsersService.findAll', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue('test');
      await controller.findAll();
      expect(service.findAll).toBeCalledTimes(1);
      expect(service.findAll).toBeCalledWith();
    });
  });

  describe('findOne', () => {
    it('should call UsersService.findOne', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue('test');
      await controller.findOne(1);
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toBeCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call UsersService.update', async () => {
      const userDto = {
        name: 'Jim',
        email: 'jim@example.com',
      };
      jest.spyOn(service, 'update').mockResolvedValue('test');
      await controller.update(1, userDto);
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(1, userDto);
    });
  });

  describe('remove', () => {
    it('should call UsersService.remove', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue('test');
      await controller.remove(1);
      expect(service.remove).toBeCalledTimes(1);
      expect(service.remove).toBeCalledWith(1);
    });
  });
});
