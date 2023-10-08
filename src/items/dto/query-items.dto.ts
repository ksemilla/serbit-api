import { IsOptional } from 'class-validator';

export class ItemQueryDto {
  @IsOptional()
  partNumber: string;
}
