import { IsNotEmpty } from 'class-validator';
import { IsUnique } from 'src/uilts';
import { Team } from '../teams.entity';
import { User } from 'src/users/users.entity';

export class CreateTeamDto {
  @IsNotEmpty()
  @IsUnique({ repository: Team })
  name: string;

  slug: string;

  @IsNotEmpty()
  owner: User;
}
