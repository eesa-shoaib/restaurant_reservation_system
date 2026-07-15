import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/restaurant-booking/users/entities/users.entity";

@Entity('restaurants')
export class Restaurants {

  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 255 })
  address: string;

  @Column({ name: 'opening_time', type: 'time' })
  openingTime: string;

  @Column({ name: 'closing_time', type: 'time' })
  closingTime: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;


}
