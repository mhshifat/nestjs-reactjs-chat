import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { IUserService } from "src/users/users.types";
import { Services } from '../../utils/constants';
import { User } from './../../utils/typeorm/entities/User';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.AUTH) private readonly userService: IUserService
  ) {
    super();
  }

  serializeUser(user: User, done: (err: null, user: User | null) => void) {
    done(null, user)
  }

  async deserializeUser(payload: User, done: (err: null, user: User | null) => void) {
    const userDb = await this.userService.findUser({ id: payload.id });
    done(null, userDb);
  }
}