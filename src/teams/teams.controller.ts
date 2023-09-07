import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateResult } from 'src/interfaces';
import { Team } from './teams.entity';
import slugify from 'slugify';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto): Promise<CreateResult> {
    createTeamDto.slug = slugify(createTeamDto.name, {
      lower: true,
      strict: true,
    });

    const tempTeam = await this.teamsService.findOne({
      where: {
        slug: createTeamDto.slug,
      },
    });
    if (tempTeam)
      throw new BadRequestException(
        `Cannot create team due to conflicting slug ${createTeamDto.slug}`,
      );

    const team = await this.teamsService.create(createTeamDto);
    return {
      id: team.id,
    };
  }

  @Get()
  async list(): Promise<{ list: Team[]; count: number }> {
    const [data, count] = await this.teamsService.find();
    return {
      list: data,
      count,
    };
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Team> {
    return this.teamsService.findOne({
      where: {
        id,
      },
      relations: {
        members: true,
      },
    });
  }
}
