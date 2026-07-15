import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/users.repository";
import { RegisterUserDto } from "./dto/register-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class RegisterUserActionService {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(dto: RegisterUserDto) {
    const exists = await this.userRepo.existsByEmail(dto.email);
    if (exists) throw new ConflictException("Email already registered");

    const password_hash = await bcrypt.hash(dto.password, 10);
    return this.userRepo.create({
      full_name: dto.full_name,
      email: dto.email,
      password_hash,
      role: dto.role,
    });
  }
}
