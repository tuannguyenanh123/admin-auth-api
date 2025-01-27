import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(10)
  password: string;

  @IsNotEmpty({
    message: 'Address is required',
  })
  address: string;

  @IsNotEmpty({
    message: 'Phone number is required',
  })
  @IsString()
  phone: string;

  image: string;
}
