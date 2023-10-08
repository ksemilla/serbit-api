import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { CreateResult } from 'src/interfaces';
import { TeamsService } from 'src/teams/teams.service';
import { EditItemDto } from './dto/edit-item.dto';
import { UpdateResult } from 'typeorm';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async list(): Promise<{ list: Item[]; count: number }> {
    const [data, count] = await this.itemsService.find({});
    return {
      list: data,
      count,
    };
  }

  @Post()
  async create(@Body() createTeamDto: CreateItemDto): Promise<CreateResult> {
    return;
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: number): Promise<number> {
    return (await this.itemsService.delete(id)).affected;
  }

  @Get(':id')
  async getItem(@Param('id') id: number): Promise<Item> {
    return this.itemsService.findOne({
      where: {
        id,
      },
    });
  }
}

@Controller('teams/:teamId/items')
export class TeamItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private readonly teamsService: TeamsService,
  ) {}

  @Get()
  async list(
    @Param('teamId') teamId: number,
  ): Promise<{ list: Item[]; count: number }> {
    const [data, count] = await this.itemsService.find({
      where: {
        team: {
          id: teamId,
        },
      },
    });
    return {
      list: data,
      count,
    };
  }

  @Post()
  async create(
    @Param('teamId') teamId: number,
    @Body() createItemDto: CreateItemDto,
  ): Promise<CreateResult> {
    const team = await this.teamsService.findOne({
      where: {
        id: teamId,
      },
    });
    createItemDto.team = team;
    const item = await this.itemsService.create(createItemDto);
    return {
      id: item.id,
    };
  }

  @Get(':id')
  async get(
    @Param('teamId') teamId: number,
    @Param('id') id: number,
  ): Promise<Item> {
    return this.itemsService.findOne({
      where: {
        team: {
          id: teamId,
        },
        id,
      },
    });
  }

  @Put(':id')
  async update(
    @Param('teamId') teamId: number,
    @Param('id') id: number,
    @Body() editItemDto: EditItemDto,
  ): Promise<UpdateResult> {
    editItemDto.id = id;
    return this.itemsService.updateOne(id, editItemDto);
  }
}
