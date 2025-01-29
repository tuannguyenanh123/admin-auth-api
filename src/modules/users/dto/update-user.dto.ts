import { IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsMongoId({
    message: 'Invalid user ID',
  })
  @IsNotEmpty({
    message: 'User ID is required',
  })
  _id: string;

  @IsOptional()
  name: string;

  @IsOptional()
  address: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  image: string;
}
