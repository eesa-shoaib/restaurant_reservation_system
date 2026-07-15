import { Entity, JoinColumn, PrimaryGeneratedColumn, ManyToOne, Column, Unique } from "typeorm";
import { Restaurants } from "src/restaurant-booking/restaurants/entities/restaurant.entity";

@Entity('restaurant_tables')
@Unique('uq_table_restaurant_labelz', ['restaurant_id', 'label'])
export class RestaurantTables {

  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @ManyToOne(() => Restaurants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurants;

  @Column({ length: 50 })
  label: string;

  @Column({ type: 'tinyint', unsigned: true })
  seats: number;

}

