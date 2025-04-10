import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  film: string;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  session: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  daytime: string;

  @IsNotEmpty()
  @IsNumber()
  row: number;

  @IsNotEmpty()
  @IsNumber()
  seat: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  id: string;
}
