import { IsArray, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateTicketDto } from './create-ticket.dto';

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  tickets: CreateTicketDto[];

  id: string;
}
