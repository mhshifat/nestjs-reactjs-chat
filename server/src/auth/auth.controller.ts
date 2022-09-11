import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { classToPlain, instanceToPlain } from 'class-transformer';
import { UsersService } from 'src/users/users.service';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth.types';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private usersService: UsersService
  ) { }

  @Get("status")
  status() {
    return
  }

  @Post("login")
  login() {
    return
  }

  @Post("logout")
  logout() {
    return
  }

  @Post("register")
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.usersService.createUser(createUserDto));
  }
}
