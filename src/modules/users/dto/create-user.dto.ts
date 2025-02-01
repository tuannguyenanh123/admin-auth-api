import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
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

  @IsOptional()
  @IsNotEmpty({
    message: 'Address is required',
  })
  address: string;

  @IsOptional()
  @IsNotEmpty({
    message: 'Phone number is required',
  })
  @IsString()
  phone: string;

  image: string;
}
