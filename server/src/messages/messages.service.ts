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

  getMessage(id: number): Promise<Message> {
    return this.messageRepo.findOne({ id });
  }

  getMessages(conversationId: number): Promise<Message[]> {
    return this.messageRepo.find({ where: { conversation: conversationId }, order: { createdAt: "DESC" }, relations: ["author"] });
  }

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

    const newMessage = this.messageRepo.create({
      content,
      author: instanceToPlain(user),
      conversation,
      createdAt: new Date()
    });
    const savedMessage = await this.messageRepo.save(newMessage);
    conversation.lastMessageSent = savedMessage;
    await this.conversationRepo.save(conversation);
    return savedMessage;
  }
}
