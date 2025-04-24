import { IsNotEmpty, IsString } from 'class-validator';

export class FindIdParams {
  @IsNotEmpty()
  @IsString()
  id: string;
}
