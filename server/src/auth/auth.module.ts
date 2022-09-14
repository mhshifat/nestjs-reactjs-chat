import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { Services } from '../utils/constants';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/Serializer';

@Module({
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionSerializer,
    {
      provide: Services.AUTH,
      useClass: AuthService
    }
  ],
  imports: [UsersModule]
})
export class AuthModule { }
