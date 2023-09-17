import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { MembersService, TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateResult } from 'src/interfaces';
import { Member, Team } from './teams.entity';
import slugify from 'slugify';
import { AddMemberDto } from './dto/add-team-member.dto';
import { CreateMemberDto } from './dto/create-member.dto';

@Controller('teams')
export class TeamsController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly membersService: MembersService,
  ) {}

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
    const [data, count] = await this.teamsService.find({
      relations: {
        owner: true,
      },
    });
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

  @Delete(':id')
  async deleteTeam(@Param('id') id: number): Promise<number> {
    return (await this.teamsService.delete(id)).affected;
  }

  @Post('/:id/members/')
  async addMember(@Param('id') id: number, @Body() addMemberDto: AddMemberDto) {
    const team = await this.teamsService.findOne({
      where: {
        id,
      },
    });

    const member = await this.membersService.create({
      user: addMemberDto.user,
      team,
    });

    return;
  }

  @Get('/:id/members/')
  async memberList(@Param('id') id: number): Promise<Member[]> {
    const team = await this.teamsService.findOne({
      where: {
        id,
      },
      relations: {
        members: true,
      },
    });
    return team.members ?? [];
  }

  @Delete(':id/members/:memberId/')
  async deleteMember(
    @Param('id') id: number,
    @Param('memberId') memberId: number,
  ): Promise<number> {
    return (await this.membersService.delete(memberId)).affected;
  }
}
