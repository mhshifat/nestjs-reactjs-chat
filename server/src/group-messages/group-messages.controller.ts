import { Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { IGroupMessagesService } from "./group-messages.types";

@Controller(Routes.GROUP_MESSAGES)
@UseGuards(AuthenticatedGuard)
export class GroupMessagesController {
  constructor(
    @Inject(Services.GROUP_MESSAGES) private readonly groupMessagesService: IGroupMessagesService
  ) {}

  @Post()
  createGroupMessages (){
    return;
  }
}