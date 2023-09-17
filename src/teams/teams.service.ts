import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member, Team } from './teams.entity';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { CreateMemberDto } from './dto/create-member.dto';

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
  async delete(id: number): Promise<DeleteResult> {
    return this.teamsRepository.delete({
      id,
    });
  }
}

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly membersRepository: Repository<Member>,
  ) {}

  async find(options?: FindManyOptions<Member>): Promise<[Member[], number]> {
    return this.membersRepository.findAndCount(options);
  }

  async findOne(options?: FindOneOptions<Member>): Promise<Member> {
    return this.membersRepository.findOne(options);
  }

  async create(data: CreateMemberDto): Promise<Member> {
    return this.membersRepository.save(data);
  }
  async delete(id: number): Promise<DeleteResult> {
    return this.membersRepository.delete({
      id,
    });
  }
}
