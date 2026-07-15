import { Module } from "@nestjs/common";
import { RestaurantController } from "./restaurant.controller";
import { RestaurantService } from "./restaurant.service";
import { CreateRestaurantActionService } from "./actions/create-restaurant-action.service";
import { UpdateOperatingHoursActionService } from "./actions/update-operating-hours-action.service";
import { UpdateRestaurantActionService } from "./actions/update-restaurant-action.service";

@Module({
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    CreateRestaurantActionService,
    UpdateOperatingHoursActionService,
    UpdateRestaurantActionService,
  ],
})
export class RestaurantsModule {}
