import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { Vendor } from './vendors.entity';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateResult } from 'typeorm';
import { EditVendorDto } from './dto/edit-vendor.dto';

@Controller('teams/:teamId/vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  async list(
    @Param('teamId') teamId: number,
  ): Promise<{ list: Vendor[]; count: number }> {
    const [list, count] = await this.vendorsService.find({
      where: {
        team: {
          id: teamId,
        },
      },
      relations: {
        vendorContacts: true,
      },
    });
    return {
      list,
      count,
    };
  }

  @Post()
  async create(@Body() createVendorDto: CreateVendorDto): Promise<Vendor> {
    return this.vendorsService.create(createVendorDto);
  }

  @Get(':id')
  async getVendor(
    @Param('teamId') teamId: number,
    @Param('id') id: number,
  ): Promise<Vendor> {
    return this.vendorsService.findOne({
      where: {
        team: {
          id: teamId,
        },
        id,
      },
      relations: {
        vendorContacts: true,
      },
    });
  }

  @Put(':id')
  async updateVendor(
    @Param('teamId') teamId: number,
    @Param('id') id: number,
    @Body() editVendorDto: EditVendorDto,
  ): Promise<Vendor> {
    return this.vendorsService.updateOne(id, editVendorDto);
  }
}
