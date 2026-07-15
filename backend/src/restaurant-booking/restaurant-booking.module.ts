import { Module } from "@nestjs/common";
import { TablesModule } from "./tables/tables.module";
import { ReservationsModule } from "./reservations/reservations.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [RestaurantsModule, ReservationsModule, TablesModule, UsersModule],
})
export class RestaurantBookingModule {}
