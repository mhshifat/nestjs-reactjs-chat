import { Injectable } from '@nestjs/common';
import { IAuthService } from './auth.types';
@Injectable()
export class AuthService implements IAuthService {
  validateUser() {
    return
  }
}
