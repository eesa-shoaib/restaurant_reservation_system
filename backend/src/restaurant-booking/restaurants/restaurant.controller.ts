import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateRestaurantDto } from "./actions/dto/create-restaurant.dto";
import { CreateRestaurantActionService } from "./actions/create-restaurant-action.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";

@Controller("restaurant")
export class RestaurantController {
  constructor(private readonly createRestaurant: CreateRestaurantActionService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateRestaurantDto, @CurrentUser('id') owner_id: number) {
    return this.createRestaurant.execute(dto, owner_id)
  }
}
