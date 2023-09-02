import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CourtsService } from './courts.service';
import { CourtEntity } from './entities/court.entity';

@Controller()
@ApiTags('venues')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Get(':courtNumber')
  @ApiOkResponse({ type: CourtEntity })
  findOne(
    @Param('venueId', ParseIntPipe) venueId: number,
    @Param('courtNumber', ParseIntPipe) courtNumber: number,
  ) {
    return this.courtsService.findOne(venueId, courtNumber);
  }
}
