import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (u) => u.ownedTeams)
  @Index()
  owner: User;

  @Index()
  @Column({ unique: true })
  slug: string;

  @Index()
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Member, (member) => member.team)
  members: Member[];
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.members, {
    cascade: true,
    eager: true,
  })
  team: Team;

  @ManyToOne(() => User, (user) => user.members)
  user: User;
}
