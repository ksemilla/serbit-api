import { IsNotEmpty, ValidateNested } from 'class-validator';
import { IsUnique } from 'src/uilts';
import { Vendor } from '../vendors.entity';
import { Type } from 'class-transformer';

export class EditVendorContact {
  id: number;
  @IsNotEmpty()
  name: string;
  email: string;
  mobile: string;
  phone: string;
  notes: string;
}

export class EditVendorDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsUnique({ repository: Vendor })
  name: string;

  mobile: string;
  phone: string;
  notes: string;

  @ValidateNested({ each: true })
  @Type(() => EditVendorContact)
  vendorContacts: EditVendorContact[];
}
