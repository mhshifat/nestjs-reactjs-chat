import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/constants';
import { GroupMessage } from 'src/utils/typeorm';
import { GroupMessagesController } from "./group-messages.controller";
import { GroupMessagesService } from "./group-messages.service";

@Module({
  imports: [TypeOrmModule.forFeature([GroupMessage])],
  controllers: [GroupMessagesController],
  providers: [{
    provide: Services.GROUP_MESSAGES,
    useClass: GroupMessagesService
  }],
  exports: [{
    provide: Services.GROUP_MESSAGES,
    useClass: GroupMessagesService
  }]
})
export class GroupMessagesModule { }