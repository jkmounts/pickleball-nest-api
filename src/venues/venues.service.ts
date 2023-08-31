import { Injectable } from '@nestjs/common';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class VenuesService {
  constructor(private prisma: PrismaService) {}
  create(createVenueDto: CreateVenueDto) {
    return this.prisma.venue.create({ data: createVenueDto });
  }

  findAll() {
    return this.prisma.venue.findMany();
  }

  findOne(id: number) {
    return this.prisma.venue.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateVenueDto: UpdateVenueDto) {
    return this.prisma.venue.update({
      where: { id },
      data: updateVenueDto,
    });
  }

  remove(id: number) {
    return this.prisma.venue.delete({ where: { id } });
  }
}
