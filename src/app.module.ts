import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  PrismaModule,
  providePrismaClientExceptionFilter,
} from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { VenuesModule } from './venues/venues.module';
import { CourtsModule } from './courts/courts.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule.forRoot({ isGlobal: true }),
    UsersModule,
    VenuesModule,
    CourtsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    providePrismaClientExceptionFilter(),
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
