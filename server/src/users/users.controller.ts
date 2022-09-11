import { Controller, Inject } from '@nestjs/common';
import { Routes, Services } from '../utils/constants';
import { UsersService } from './users.service';

@Controller(Routes.USERS)
export class UsersController {
  constructor(@Inject(Services.USERS) private usersService: UsersService) { }
}
