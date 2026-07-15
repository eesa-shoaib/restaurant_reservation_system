import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

export type UserRole = "user" | "customer";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn({ type: "bigint", unsigned: true }) id!: number;

  @Column({ name: "full_name", length: 150 })
  full_name!: string;

  @Column({ length: 191, unique: true })
  email: string;

  @Column({ name: 'password_hash', length: 255 })
  password_hash: string;

  @Column({ type: 'enum', enum: ['owner', 'customer'], name: 'role', default: 'customer' })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  create_at: string;
}
