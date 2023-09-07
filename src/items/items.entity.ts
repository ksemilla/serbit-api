import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

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
