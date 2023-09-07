import { IsNotEmpty } from 'class-validator';
import { IsUnique } from 'src/uilts';
import { User } from '../users.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsUnique({ repository: User })
  email: string;

  @IsNotEmpty()
  password: string;
}
