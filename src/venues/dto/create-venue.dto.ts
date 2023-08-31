import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateVenueDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @ApiProperty()
  state: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 10)
  @ApiProperty()
  zipCode: string;
}
