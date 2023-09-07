import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './teams.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(Team)
    private readonly teamsRepository: Repository<Team>,
  ) {}

  async find(options?: FindManyOptions<Team>): Promise<[Team[], number]> {
    return this.teamsRepository.findAndCount(options);
  }

  async findOne(options?: FindOneOptions<Team>): Promise<Team> {
    return this.teamsRepository.findOne(options);
  }

  async create(data: CreateTeamDto): Promise<Team> {
    return this.teamsRepository.save(data);
  }
}
