import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  balance: number;
}
