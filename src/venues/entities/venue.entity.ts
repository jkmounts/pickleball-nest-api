import { ApiProperty } from '@nestjs/swagger';
import { Venue } from '@prisma/client';

export class VenueEntity implements Venue {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  zipCode: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
