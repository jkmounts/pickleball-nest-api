import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { VenueEntity } from './entities/venue.entity';
import { VenueWithCourtsEntity } from './entities/venueWithCourts.entity';

@Controller('venues')
@ApiTags('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @ApiCreatedResponse({ type: VenueEntity })
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venuesService.create(createVenueDto);
  }

  @Get()
  @ApiOkResponse({ type: VenueWithCourtsEntity, isArray: true })
  findAll() {
    return this.venuesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: VenueWithCourtsEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.venuesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: VenueEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVenueDto: UpdateVenueDto,
  ) {
    return this.venuesService.update(id, updateVenueDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: VenueEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.venuesService.remove(id);
  }
}
