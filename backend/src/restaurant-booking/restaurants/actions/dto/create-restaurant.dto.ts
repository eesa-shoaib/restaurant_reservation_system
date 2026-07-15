import { Matches, MaxLength, IsString, IsNotEmpty } from "class-validator";

export class CreateRestaurantDto {

  @IsString() @IsNotEmpty() @MaxLength(150)
  name: string;

  @IsString() @IsNotEmpty() @MaxLength(255)
  address: string;

  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, { message: 'opening_time must be HH:mm or HH:mm:ss' })
  opening_time: string;

  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, { message: 'closing_time must be HH:mm or HH:mm:ss' })
  closing_time: string;
}
