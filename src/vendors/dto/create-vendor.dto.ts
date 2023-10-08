import { IsNotEmpty, ValidateNested } from 'class-validator';
import { IsUnique } from 'src/uilts';
import { Vendor } from '../vendors.entity';
import { Type } from 'class-transformer';

export class CreateVendorContactDto {
  @IsNotEmpty()
  name: string;
  email: string;
  mobile: string;
  phone: string;
  notes: string;
}

export class CreateVendorDto {
  @IsNotEmpty()
  @IsUnique({ repository: Vendor })
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateVendorContactDto)
  vendorContacts: CreateVendorContactDto[];
}
