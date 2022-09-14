import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { Inject, Injectable } from '@nestjs/common';
import { Services } from "src/utils/constants";
import { IAuthService } from "../auth.types";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(Services.AUTH) private readonly authService: IAuthService) {
    super({ usernameField: "email" });
  }

  async validate(email: string, password: string) {
    return await this.authService.validateUser({ email, password });
  }
}