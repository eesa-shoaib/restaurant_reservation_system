import { Body, Controller, Post } from "@nestjs/common";
import { Public } from "src/common/decorators/public.decorator";
import { RegisterUserActionService } from "./actions/register-user-action.service";
import { LoginActionService } from "./actions/login-action.service";
import { RegisterUserDto } from "./actions/dto/register-user.dto";
import { LoginDto } from "./actions/dto/login.dto";

@Controller("auth")
export class UsersController {
  constructor(
    private readonly register: RegisterUserActionService,
    private readonly login: LoginActionService,
  ) {}

  @Public()
  @Post("register")
  registerUser(@Body() dto: RegisterUserDto) {
    return this.register.execute(dto);
  }

  @Public()
  @Post("login")
  loginUser(@Body() dto: LoginDto) {
    return this.login.execute(dto);
  }
}
