import { User } from 'src/utils/typeorm';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';

export interface IUserService {
  createUser(dto: CreateUserDetails): Promise<User>;
  saveUser(user: User): Promise<User>;
  findUser(findUserParams: FindUserParams): Promise<User>;
  find(findUserParams?: FindUserParams): Promise<User[]>;
}