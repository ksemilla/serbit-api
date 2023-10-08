import { IsNotEmpty } from 'class-validator';
import { IsUnique } from 'src/uilts';
import { Item } from '../items.entity';

export class EditItemDto {
  id: number;

  @IsNotEmpty()
  @IsUnique({ repository: Item })
  partNumber: string;

  name: string;
  description: string;
  listPrice: number;
  sellPrice: number;
  quantity: number;
  isActive: boolean;
}
