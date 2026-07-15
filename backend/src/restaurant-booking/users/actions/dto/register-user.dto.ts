import { IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterUserDto {

  @IsNotEmpty() @MaxLength(150)
  full_name: string;

  @IsEmail() @MaxLength(191)
  email: string;

  @IsNotEmpty() @MinLength(6) @MaxLength(255)
  password: string;

  @IsEnum(['owner', 'customer'])
  role: 'owner' | 'customer';
}
