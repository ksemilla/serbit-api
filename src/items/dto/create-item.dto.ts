import { IsNotEmpty } from 'class-validator';
import { IsUnique } from 'src/uilts';
import { Item } from '../items.entity';
import { Team } from 'src/teams/teams.entity';

export class CreateItemDto {
  @IsNotEmpty()
  @IsUnique({ repository: Item })
  partNumber: string;

  name: string;
  description: string;
  listPrice: number;
  sellPrice: number;
  quantity: number;
  isActive: boolean;
  team: Team;
}
