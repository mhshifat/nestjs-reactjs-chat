import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Conversation, User } from 'src/utils/typeorm';
import { CreateConversationDetails } from 'src/utils/types';
import { IConversationsService } from './conversations.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation) private readonly conversationRepo: Repository<Conversation>,
    @Inject(Services.USERS) private readonly userService: UsersService,
  ) { }

  findConversationById(id: number): Promise<Conversation> {
    return this.conversationRepo.findOne(id, { relations: ["creator", "recipient", "messages", "messages.author", "messages.conversation"] });
  }

  async find(id: number) {
    return this.conversationRepo
      .createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.creator", "creator")
      .leftJoinAndSelect("conversation.recipient", "recipient")
      .leftJoinAndSelect("conversation.lastMessageSent", "lastMessageSent")
      .where("creator.id = :authUserId OR recipient.id = :authUserId", { authUserId: id })
      .orderBy("conversation.lastMessageSentAt", "DESC")
      .getMany();
  }

  async createConversation(user: User, payload: CreateConversationDetails): Promise<Conversation> {
    const recipient = await this.userService.findUser({ email: payload.email });
    if (!recipient) throw new HttpException("Recipient not found!", HttpStatus.BAD_REQUEST);
    const existingConversation = await this.conversationRepo
    .createQueryBuilder("conversation")
    .where("(conversation.creator = :creatorId AND conversation.recipient = :recipientId) OR (conversation.creator = :recipientId AND conversation.recipient = :creatorId)", { creatorId: user.id, recipientId: recipient.id })
    .getOne();
    if (existingConversation) throw new HttpException("Conversation already exist!", HttpStatus.BAD_REQUEST);
    const newConversation = this.conversationRepo.create({
      creator: user,
      recipient,
    })
    return this.conversationRepo.save(newConversation);
  }
}
