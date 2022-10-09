import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Routes, Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
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
  async getMessages(
    @Param("conversationId", { transform: (value) => +value }) conversationId: number
  ) {
    const messages = await this.messageService.getMessages(conversationId);
    return { conversationId, messages };
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

  @Delete(":messageId")
  async deleteMessage(
    @AuthUser() user: User,
    @Param("messageId", ParseIntPipe) messageId: number,
    @Query("conversation", ParseIntPipe) conversationId: number
  ) {
    return this.messageService.deleteMessage(user, { conversationId, messageId });
  }
}
