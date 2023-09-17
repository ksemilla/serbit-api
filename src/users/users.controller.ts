import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.public';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { EditUserDto } from './dto/edit-user.dto';
import { UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ id: number; accessToken: string }> {
    const saltOrRounds = this.configService.get<number>('SALT_ROUNDS');
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const user = await this.usersService.create({
      email: createUserDto.email,
      password: hash,
    });

    const payload = { email: user.email, sub: user.id };
    return {
      id: user.id,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  @Get()
  async findAll(): Promise<{ list: User[]; count: number }> {
    const [data, count] = await this.usersService.find();
    return {
      list: data,
      count,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne({
      where: {
        id,
      },
      relations: {
        members: true,
        ownedTeams: true,
      },
    });
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() editUserDto: EditUserDto,
  ): Promise<UpdateResult> {
    return this.usersService.updateOne(id, editUserDto);
  }
}
