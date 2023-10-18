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
import { EditVendorDto } from './dto/edit-vendor.dto';

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
  async updateOne(id: number, data: EditVendorDto): Promise<Vendor> {
    const { vendorContacts, ...rest } = data;

    let vendor = await this.vendorsRepository.save(rest);

    const vendorContactIds = await Promise.all(
      vendorContacts.map(async (vc) => {
        const vendorContact = await this.vendorContactsRepository.save({
          ...vc,
          vendor,
        });
        return vendorContact.id;
      }),
    );

    vendor = await this.vendorsRepository.findOne({
      where: {
        id,
      },
      relations: {
        vendorContacts: true,
      },
    });

    vendor.vendorContacts.forEach(async (vc) => {
      if (!vendorContactIds.includes(vc.id)) {
        await this.vendorContactsRepository.remove(vc);
      }
    });

    return vendor;
  }
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
