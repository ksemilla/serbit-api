import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController, TeamItemsController } from './items.controller';
import { Item } from './items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsService } from 'src/teams/teams.service';
import { Team } from 'src/teams/teams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Team])],
  providers: [ItemsService, TeamsService],
  controllers: [ItemsController, TeamItemsController],
})
export class ItemsModule {}
