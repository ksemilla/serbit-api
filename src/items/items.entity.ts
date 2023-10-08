import { Team } from 'src/teams/teams.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.items, {
    cascade: true,
    eager: true,
  })
  @Index()
  team: Team;

  @Column({ unique: true })
  partNumber: string;

  @Column()
  name: string;

  @Column()
  sellPrice: number;

  @Column({ default: 0 })
  listPrice: number;

  @Column({ default: 0 })
  quantity: number;

  @Column()
  description: string;

  @Index()
  @Column({ default: true })
  isActive: boolean;
}
