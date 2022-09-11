import { Injectable } from '@nestjs/common';
import { IUserService } from './users.types';
import { CreateUserDetails } from 'src/utils/types';

@Injectable()
export class UsersService implements IUserService {
  createUser(dto: CreateUserDetails) {
    console.log("Create User", dto);
  }
}
