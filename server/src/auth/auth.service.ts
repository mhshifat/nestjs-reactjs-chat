import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Services } from 'src/utils/constants';
import { comparePassword } from 'src/utils/helpers';
import { UserCredentialDetails } from 'src/utils/types';
import { IAuthService } from './auth.types';
@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private readonly userService: UsersService) { }

  async validateUser(userCredentialDetails: UserCredentialDetails) {
    const user = await this.userService.findUser({ email: userCredentialDetails.email });
    if (!user) throw new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    return await comparePassword(userCredentialDetails.password, user.password);
  }
}
