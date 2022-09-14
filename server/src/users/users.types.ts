import { User } from 'src/utils/typeorm';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';

export interface IUserService {
  createUser(dto: CreateUserDetails): Promise<User>;
  findUser(findUserParams: FindUserParams): Promise<User>;
}