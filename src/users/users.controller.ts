import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.public';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateResult } from 'src/interfaces';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateResult> {
    const tempUser = await this.usersService.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (tempUser) throw new BadRequestException('email already in use');

    const saltOrRounds = this.configService.get<number>('SALT_ROUNDS');
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const user = await this.usersService.create({
      email: createUserDto.email,
      password: hash,
    });
    return { id: user.id };
  }

  @Get()
  findAll(): string {
    return 'test';
  }
}
