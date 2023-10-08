import { Module } from '@nestjs/common';
import { VendorsController } from './vendors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vendor, VendorContact } from './vendors.entity';
import { VendorsService } from './vendors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor, VendorContact])],
  providers: [VendorsService],
  controllers: [VendorsController],
})
export class VendorsModule {}
