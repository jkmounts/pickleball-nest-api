import { Module } from '@nestjs/common';
import { VenuesService } from './venues.service';
import { VenuesController } from './venues.controller';
import { RouterModule } from '@nestjs/core';
import { CourtsModule } from 'src/courts/courts.module';

@Module({
  controllers: [VenuesController],
  providers: [VenuesService],
  imports: [
    RouterModule.register([
      {
        path: 'venues/:venueId/courts',
        module: CourtsModule,
      },
    ]),
  ],
})
export class VenuesModule {}
