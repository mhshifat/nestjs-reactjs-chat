import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/Guards';
import { Services } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';
import { IConversationsService } from './conversations.types';
import { CreateParticipantDto } from './dtos/CreateParticipant.dto';

@Controller('conversations')
@UseGuards(AuthenticatedGuard)
export class ConversationsController {
  constructor(
    @Inject(Services.CONVERSATIONS) private readonly coversationService: IConversationsService,
  ) { }

  @Post()
  async createConversation(@AuthUser() user: User, @Body() dto: CreateParticipantDto) {
    return this.coversationService.createConversation(user, dto)
  }
}
