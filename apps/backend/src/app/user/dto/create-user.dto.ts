import { IsString, IsEmail, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string; // Ensures a password is provided during user creation

  @IsBoolean()
  verified?: boolean; // Optional field to allow default behavior in the database
}
