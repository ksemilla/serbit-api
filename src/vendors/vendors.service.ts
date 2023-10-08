import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Vendor, VendorContact } from './vendors.entity';
import {
  CreateVendorContactDto,
  CreateVendorDto,
} from './dto/create-vendor.dto';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorsRepository: Repository<Vendor>,
    @InjectRepository(VendorContact)
    private readonly vendorContactsRepository: Repository<VendorContact>,
  ) {}

  async find(options?: FindManyOptions<Vendor>): Promise<[Vendor[], number]> {
    return this.vendorsRepository.findAndCount(options);
  }

  async findOne(options?: FindOneOptions<Vendor>): Promise<Vendor> {
    return this.vendorsRepository.findOne(options);
  }

  async create(data: CreateVendorDto): Promise<Vendor> {
    console.log('got here', data);
    const vendor = await this.vendorsRepository.save(data);

    data.vendorContacts.map(async (vc) => {
      await this.vendorContactsRepository.save({
        ...vc,
        vendor,
      });
    });

    return vendor;
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.vendorsRepository.delete({
      id,
    });
  }
  // async updateOne(id: number, data: EditVendorDto): Promise<UpdateResult> {
  //   return this.vendorsRepository.update({ id }, data);
  // }
}

@Injectable()
export class VendorContactsService {
  constructor(
    @InjectRepository(VendorContact)
    private readonly vendorContactsRepository: Repository<VendorContact>,
  ) {}

  async create(data: CreateVendorContactDto): Promise<VendorContact> {
    return this.vendorContactsRepository.save(data);
  }
}
