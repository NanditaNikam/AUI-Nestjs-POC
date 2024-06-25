import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateUserDto {
 
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
