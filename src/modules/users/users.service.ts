import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { hashPassword } from 'src/helpers/utils';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async isEmailExist(email: string) {
    const user = await this.userModel.exists({ email });
    if (user) return true;
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, address, password, phone, image } = createUserDto;

    const isEmailExist = await this.isEmailExist(email);
    if (isEmailExist) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await hashPassword(password);
    const user = await this.userModel.create({
      name,
      email,
      address,
      phone,
      image,
      password: hashedPassword,
    });

    return {
      // user,
      _id: user._id,
    };
  }

  async findAll(query: string, pageIndex: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.pageSize) delete filter.pageSize;
    if (filter.pageIndex) delete filter.pageIndex;

    if (!pageSize) pageSize = 10;
    if (!pageIndex) pageIndex = 1;

    const totalItems = (await this.userModel.countDocuments(filter)) as number;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (pageIndex - 1) * pageSize;

    const results = await this.userModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any)
      .exec();

    return {
      meta: {
        pageIndex,
        pageSize,
        totalPages,
        totalItems,
      },
      results,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      updateUserDto,
    );
  }

  async remove(id: string) {
    if (mongoose.isValidObjectId(id)) {
      return this.userModel.deleteOne({ _id: id });
    } else {
      throw new BadRequestException('Invalid user ID');
    }
  }
}
