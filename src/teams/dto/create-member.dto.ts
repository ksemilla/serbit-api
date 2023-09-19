import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/users.entity';
import { Team } from '../teams.entity';

export class CreateMemberDto {
  user: User;

  @IsNotEmpty()
  team: Team;

  @IsNotEmpty()
  nickName: string;
}
