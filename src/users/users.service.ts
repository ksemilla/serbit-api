import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.save(createUserDto);
    if (!user) throw new BadRequestException('Cannot create user');
    return user;
  }

  async findOne(options?: FindOneOptions<User>): Promise<User> {
    return this.usersRepository.findOne(options);
  }

  async find(options?: FindManyOptions<User>): Promise<[User[], number]> {
    return this.usersRepository.findAndCount(options);
  }

  async updateOne(id: number, data: EditUserDto): Promise<UpdateResult> {
    return this.usersRepository.update({ id }, data);
  }
}
