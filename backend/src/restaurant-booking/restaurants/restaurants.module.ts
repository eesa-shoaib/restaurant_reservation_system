import { Module } from "@nestjs/common";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { CreateRestaurantActionService } from "./actions/create-restaurant-action.service";
import { UpdateOperatingHoursActionService } from "./actions/update-operating-hours-action.service";
import { UpdateRestaurantActionService } from "./actions/update-restaurant-action.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Restaurants } from "./entities/restaurant.entity";
import { RestaurantRepository } from "./repositories/restaurant.repository";
import { UsersModule } from "../users/users.module";

@Module({

  imports: [TypeOrmModule.forFeature([Restaurants]), UsersModule],
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    RestaurantRepository,
    CreateRestaurantActionService,
    UpdateOperatingHoursActionService,
    UpdateRestaurantActionService,
  ],

})
export class RestaurantsModule { }
