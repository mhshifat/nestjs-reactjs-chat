import { Controller, Inject } from '@nestjs/common';
import { Routes, Services } from '../utils/types';
import { IAuthService } from './auth.types';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private authService: IAuthService) { }
}
