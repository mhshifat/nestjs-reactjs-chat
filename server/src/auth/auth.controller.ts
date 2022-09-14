import { Body, Controller, Get, HttpStatus, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { Routes, Services } from '../utils/constants';
import { IAuthService } from './auth.types';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/Guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private usersService: UsersService
  ) { }

  @Get("status")
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Post("login")
  @UseGuards(LocalAuthGuard)
  login(@Res() res: Response) {
    return res.send(HttpStatus.OK);
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
