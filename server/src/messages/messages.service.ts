import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { CreateMessageDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IMessagesService } from './messages.types';

@Injectable()
export class MessagesService implements IMessagesService {
  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    @InjectRepository(Conversation) private readonly conversationRepo: Repository<Conversation>
  ) { }

  async createMessage(user: User, { content, conversationId }: CreateMessageDetails): Promise<Message> {
    const conversation = await this.conversationRepo
      .createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.creator", "creator")
      .leftJoinAndSelect("conversation.recipient", "recipient")
      .where({ id: conversationId })
      .andWhere("creator.id", { id: user.id })
      .orWhere("recipient.id", { id: user.id })
      .getOne();

    if (!conversation) throw new HttpException("Conversation not found", HttpStatus.BAD_REQUEST);
    conversation.creator = instanceToPlain(conversation.creator) as User;
    conversation.recipient = instanceToPlain(conversation.recipient) as User;

    const newMessage = this.messageRepo.create({
      content,
      author: instanceToPlain(user),
      conversation,
    });
    return this.messageRepo.save(newMessage);
  }
}
