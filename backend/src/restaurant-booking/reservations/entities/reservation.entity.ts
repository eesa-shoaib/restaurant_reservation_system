import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, Check, Index } from "typeorm";
import { User } from "src/restaurant-booking/users/entities/users.entity";
import { RestaurantTables } from "src/restaurant-booking/tables/entities/table.entity";

export type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show'

@Entity('reservations')
@Index('idx_reservations_conflict_check', ['table', 'reservation_date', 'status', 'start_time', 'end_time'])
@Check('chk_reservation_time', '`end_time` > `start_time`')
export class Reservation {

  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @ManyToOne(() => RestaurantTables, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'table_id' })
  table: RestaurantTables;

  @Column({ name: 'party_size', type: 'tinyint', unsigned: true })
  party_size: number;

  @Column({ name: 'reservation_date', type: 'date' })
  reservation_date: string;

  @Column({ name: 'start_time', type: 'time' })
  start_time: string;

  @Column({ name: 'end_time', type: 'time' })
  end_time: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
    default: 'pending',
  })
  status: ReservationStatus;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
