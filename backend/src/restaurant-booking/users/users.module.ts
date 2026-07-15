import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "./entities/users.entity";
import { UserRepository } from "./repositories/users.repository";
import { RegisterUserActionService } from "./actions/register-user-action.service";
import { LoginActionService } from "./actions/login-action.service";
import { UsersController } from "./users.controller";

@Module({

  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: (config.get<string>('JWT_EXPIRES_IN') ?? '1d') as any },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UserRepository, RegisterUserActionService, LoginActionService],
  exports: [TypeOrmModule, UserRepository],

})
export class UsersModule { }
