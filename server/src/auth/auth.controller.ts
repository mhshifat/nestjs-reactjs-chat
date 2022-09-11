import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Routes, Services } from '../utils/types';
import { IAuthService } from './auth.types';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) { }

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
  registerUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto)
  }
}
