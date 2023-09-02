import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CourtsService {
  constructor(private prisma: PrismaService) {}
  findOne(venueId: number, courtNumber: number) {
    return this.prisma.court.findUnique({
      where: {
        venueId_courtNumber: {
          venueId,
          courtNumber,
        },
      },
    });
  }
}
