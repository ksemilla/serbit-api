import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member, Team } from './teams.entity';
import { User } from 'src/users/users.entity';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { IsUniqueContstraint } from 'src/uilts';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Member, User])],
  providers: [TeamsService, IsUniqueContstraint],
  controllers: [TeamsController],
})
export class TeamsModule {}
