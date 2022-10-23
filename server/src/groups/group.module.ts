import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Services } from 'src/utils/constants';
import { GroupConversation } from 'src/utils/typeorm';
import { GroupController } from "./group.controller"
import { GroupService } from "./group.service"

@Module({
  imports: [TypeOrmModule.forFeature([GroupConversation]), UsersModule],
  exports: [],
  providers: [{
    provide: Services.GROUPS,
    useClass: GroupService
  }],
  controllers: [GroupController]
})
export class GroupModule {}