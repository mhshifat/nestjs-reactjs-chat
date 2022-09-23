import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { IMessagesService } from './messages.types';

@Controller(Routes.MESSAGES)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMessagesService
  ) { }

  @Post()
  createMessage(
    @AuthUser() user: User,
    @Body() dto: CreateMessageDto
  ) {
    return this.messageService.createMessage(user, dto);
  }
}
