import { Injectable } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurants } from "../entities/restaurant.entity";

@Injectable()
export class RestaurantRepository {

  constructor(@InjectRepository(Restaurants) private readonly repo: Repository<Restaurants>) { }

  create(data: DeepPartial<Restaurants>) {
    return this.repo.save(this.repo.create(data));
  }

  findAll() {
    return this.repo.find();
  }

  findByID(id: number) {
    return this.repo.findOne({ where: { id } });
  }
}
