import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  create(): string {
    return 'created user';
  }

  @Get()
  findAll(): string {
    return 'test';
  }
}
