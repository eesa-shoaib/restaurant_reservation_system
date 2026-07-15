import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "src/restaurant-booking/users/entities/users.entity";

@Injectable()
export class ReservationRepository {

  constructor(
    @InjectRepository(Users) private readonly repo: Repository<Users>,
  ) { }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  create(data: Partial<Users>) {
    return this.repo.save(this.repo.create(data));
  }
}
