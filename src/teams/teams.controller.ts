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
  async addMember(
    @Param('id') id: number,
    @Body() addMemberDto: AddMemberDto,
  ): Promise<Member> {
    const team = await this.teamsService.findOne({
      where: {
        id,
      },
    });

    return await this.membersService.create({
      user: addMemberDto.user,
      team,
      nickName: addMemberDto.nickName,
    });
  }
}

@Controller('teams/:teamId/members/')
export class TeamMembersController {
  constructor(
    private readonly teamsService: TeamsService,
    private readonly membersService: MembersService,
  ) {}
  @Get()
  async list(
    @Param('teamId') teamId: number,
  ): Promise<{ list: Member[]; count: number }> {
    const [members, count] = await this.membersService.find({
      where: {
        team: {
          id: teamId,
        },
      },
    });
    return {
      list: members,
      count,
    };
  }

  @Delete(':memberId')
  async deleteMember(
    @Param('teamId') teamId: number,
    @Param('memberId') memberId: number,
  ): Promise<number> {
    return (await this.membersService.delete(memberId)).affected;
  }
}

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async list(): Promise<{ list: Member[]; count: number }> {
    const [data, count] = await this.membersService.find({});
    return {
      list: data,
      count,
    };
  }

  @Delete(':id')
  async deleteMember(@Param('id') id: number): Promise<number> {
    return (await this.membersService.delete(id)).affected;
  }

  @Get(':id')
  async getMember(@Param('id') id: number): Promise<Member> {
    return this.membersService.findOne({
      where: {
        id,
      },
    });
  }
}
