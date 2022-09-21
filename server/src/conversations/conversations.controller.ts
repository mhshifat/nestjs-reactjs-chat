import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IConversationsService } from './conversations.types';
import { CreateConversationDto } from './dtos/CreateConversation.dto';

@Controller('conversations')
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS) private readonly coversationService: IConversationsService,
  ) { }

  @Post()
  async createConversation(@AuthUser() user: User, @Body() dto: CreateConversationDto) {
    return this.coversationService.createConversation(user, dto)
  }

  @Get()
  async getConversations(@AuthUser() user: User) {
    return await this.coversationService.find(user.id);
  }

  @Get(":id")
  async getConversationById(@Param("id") id: number) {
    return this.coversationService.findConversationById(id);
  }
}
