import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
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
    @Inject(Services.MESSAGES) private readonly messageService: IMessagesService,
    private eventEmmiter: EventEmitter2
  ) { }

  @Get(":conversationId")
  getMessages(
    @Param("conversationId") conversationId: number
  ) {
    return this.messageService.getMessages(conversationId);
  }

  @Post()
  async createMessage(
    @AuthUser() user: User,
    @Body() dto: CreateMessageDto
  ) {
    const savedMessage = await this.messageService.createMessage(user, dto);
    this.eventEmmiter.emit("message.create", savedMessage)
    return;
  }
}
