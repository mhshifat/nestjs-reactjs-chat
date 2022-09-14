import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { IUserService } from 'src/users/users.types';
import { Services } from 'src/utils/constants';
import { comparePassword } from 'src/utils/helpers';
import { UserCredentialDetails } from 'src/utils/types';
import { IAuthService } from './auth.types';
@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private readonly userService: IUserService) { }

  async validateUser(userCredentialDetails: UserCredentialDetails) {
    const user = await this.userService.findUser({ email: userCredentialDetails.email });
    if (!user) throw new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    const isPassMatched = await comparePassword(userCredentialDetails.password, user.password);
    return isPassMatched ? user : null
  }
}
