import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCourtDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  courtNumber: number;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @ApiProperty()
  name?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  venueId: number;
}
