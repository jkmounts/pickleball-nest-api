import { ApiProperty } from '@nestjs/swagger';
import { Court } from '@prisma/client';

export class CourtEntity implements Court {
  @ApiProperty()
  courtNumber: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  venueId: number;
}
