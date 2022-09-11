import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './users.types';
import { CreateUserDetails } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from './../utils/helpers';

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) { }

  async createUser(dto: CreateUserDetails) {
    const existingUser = await this.userRepo.findOneBy({ email: dto.email });
    if (existingUser) throw new HttpException("User Already Exists!", HttpStatus.CONFLICT);
    const password = await hashPassword(dto.password);
    const newUser = await this.userRepo.create({ ...dto, password });
    return this.userRepo.save(newUser);
  }
}
