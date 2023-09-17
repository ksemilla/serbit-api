import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/users.entity';
import { Team } from '../teams.entity';

export class CreateMemberDto {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  team: Team;
}
