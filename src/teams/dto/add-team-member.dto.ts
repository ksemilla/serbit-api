import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/users.entity';

export class AddMemberDto {
  user: User;

  @IsNotEmpty()
  nickName: string;
}
