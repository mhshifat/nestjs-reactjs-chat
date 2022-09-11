import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { Services } from '../utils/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [{
    provide: Services.AUTH,
    useClass: AuthService,
  }],
  imports: [UsersModule]
})
export class AuthModule { }
