import { Team } from 'src/teams/teams.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team)
  @Index()
  team: Team;

  @Column({ unique: true })
  @Index()
  name: string;

  @Index()
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => VendorContact, (vendorContact) => vendorContact.vendor)
  vendorContacts: VendorContact[];
}

@Entity()
export class VendorContact {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.vendorContacts, {
    cascade: true,
    eager: true,
  })
  vendor: Vendor;

  @Column()
  name: string;

  @Column({ default: '' })
  mobile: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  notes: string;
}
