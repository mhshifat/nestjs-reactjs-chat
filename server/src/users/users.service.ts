import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './users.types';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from './../utils/helpers';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

  async findUser(findUserParams: FindUserParams) {
    return this.userRepo.findOne(findUserParams);
  }

  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.userRepo.findOne({ email: userDetails.email });
    if (existingUser) throw new HttpException("User Already Exists!", HttpStatus.CONFLICT);
    const password = await hashPassword(userDetails.password);
    const newUser = await this.userRepo.create({ ...userDetails, password });
    return this.userRepo.save(newUser);
  }
}
