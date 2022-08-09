import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty() id: string;
  @IsNotEmpty() fullName: string;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() role: string;
}
