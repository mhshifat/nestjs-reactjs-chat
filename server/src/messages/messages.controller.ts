import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { Message, User } from 'src/utils/typeorm';
import { CreateMessageDto } from './dtos/CreateMessage.dto';
import { IMessagesService } from './messages.types';

@Controller(Routes.MESSAGES)
@UseGuards(AuthenticatedGuard)
export class MessagesController {
  constructor(
    @Inject(Services.MESSAGES) private readonly messageService: IMessagesService
  ) { }

  @Get(":conversationId")
  getMessages(
    @Param("conversationId") conversationId: number
  ) {
    return this.messageService.getMessages(conversationId);
  }

  @Post()
  createMessage(
    @AuthUser() user: User,
    @Body() dto: CreateMessageDto
  ) {
    return this.messageService.createMessage(user, dto);
  }
}
