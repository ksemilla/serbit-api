import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, Team } from './teams.entity';
import { User } from 'src/users/users.entity';
import {
  MembersController,
  TeamMembersController,
  TeamsController,
} from './teams.controller';
import { MembersService, TeamsService } from './teams.service';
import { IsUniqueContstraint } from 'src/uilts';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Member, User])],
  providers: [TeamsService, IsUniqueContstraint, MembersService],
  controllers: [TeamsController, MembersController, TeamMembersController],
})
export class TeamsModule {}
