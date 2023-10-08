import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './items.entity';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { EditItemDto } from './dto/edit-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async find(options?: FindManyOptions<Item>): Promise<[Item[], number]> {
    return this.itemsRepository.findAndCount(options);
  }

  async findOne(options?: FindOneOptions<Item>): Promise<Item> {
    return this.itemsRepository.findOne(options);
  }

  async create(data: CreateItemDto): Promise<Item> {
    return this.itemsRepository.save(data);
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.itemsRepository.delete({
      id,
    });
  }
  async updateOne(id: number, data: EditItemDto): Promise<UpdateResult> {
    return this.itemsRepository.update({ id }, data);
  }
}
