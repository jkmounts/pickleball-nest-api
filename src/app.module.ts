import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { VenuesModule } from './venues/venues.module';

@Module({
  imports: [
    PrismaModule.forRoot({ isGlobal: true }),
    UsersModule,
    VenuesModule,
  ],
  controllers: [AppController],
  providers: [AppService, providePrismaClientExceptionFilter()],
})
export class AppModule {}
