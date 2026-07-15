import { Injectable } from "@nestjs/common";
import { RestaurantRepository } from "../repositories/restaurant.repository";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";

@Injectable()
export class CreateRestaurantActionService {

  constructor(private readonly restaurant_repo: RestaurantRepository) { }

  execute(dto: CreateRestaurantDto, owner_id: number) {
    return this.restaurant_repo.create({
      name: dto.name,
      address: dto.address,
      openingTime: dto.opening_time,
      closingTime: dto.closing_time,
      owner: { id: owner_id } as any
    })
  }
}
