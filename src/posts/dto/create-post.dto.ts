import { IsNotEmpty, IsString } from 'class-validator';
import { UserOutputType } from 'src/user/user-types/user.outputType';
export class CreatePostDto {
 
  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  createdBy: UserOutputType;
}
