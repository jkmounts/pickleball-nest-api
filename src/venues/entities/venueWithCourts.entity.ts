import { CourtEntity } from 'src/courts/entities/court.entity';
import { VenueEntity } from './venue.entity';
import { ApiProperty } from '@nestjs/swagger';

export class VenueWithCourtsEntity extends VenueEntity {
  @ApiProperty({ type: () => [CourtEntity] })
  courts: CourtEntity[] | [];
}
