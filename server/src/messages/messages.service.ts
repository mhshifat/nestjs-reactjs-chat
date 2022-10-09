import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { CreateMessageDetails, DeleteMessageDetails } from 'src/utils/types';
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

  async getMessages(conversationId: number): Promise<Message[]> {
    return this.messageRepo.find({ where: { conversation: conversationId }, order: { createdAt: "DESC" }, relations: ["author"] });
  }

  async createMessage(user: User, { content, conversationId }: CreateMessageDetails): Promise<Message> {
    const conversation = await this.conversationRepo
      .createQueryBuilder("conversation")
      .leftJoinAndSelect("conversation.creator", "creator")
      .leftJoinAndSelect("conversation.recipient", "recipient")
      .leftJoinAndSelect("conversation.lastMessageSent", "lastMessageSent")
      .where("conversation.id = :conversationId", { conversationId })
      .andWhere("creator.id = :authUserId OR recipient.id = :authUserId", { authUserId: user.id })
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

  async deleteMessage(user: User, { messageId, conversationId }: DeleteMessageDetails): Promise<{ message: Message, conversation: Conversation }> {
    const message = await this.messageRepo.findOne({ where: { id: messageId, author: user.id, conversation: conversationId }, relations: ["conversation", "author"] });
    if (!message) throw new HttpException("Cannot delete message", HttpStatus.BAD_REQUEST);
    const conversation = await this.conversationRepo
    .createQueryBuilder("conversation")
    .where("conversation.id = :conversationId", { conversationId })
    .leftJoinAndSelect("conversation.creator", "creator")
    .leftJoinAndSelect("conversation.recipient", "recipient")
    .leftJoinAndSelect("conversation.lastMessageSent", "lastMessageSent")
    .leftJoinAndSelect("conversation.messages", "messages")
    .orderBy("messages.createdAt", "DESC")
    .limit(2)
    .getOne();
    if (!conversation) throw new HttpException("Cannot delete message", HttpStatus.BAD_REQUEST);
    if (conversation.lastMessageSent.id === messageId && conversation.messages.length) {
      const lastMessageSent = conversation.messages.reverse()[0];
      await this.conversationRepo
        .createQueryBuilder()
        .update("conversations")
        .set({ lastMessageSent: conversation.messages.length > 1 ? lastMessageSent : null })
        .where("id = :conversationId", { conversationId })
        .execute();
      conversation.lastMessageSent = conversation.messages.length > 1 ? lastMessageSent : null;
    }
    await this.messageRepo.delete({ id: messageId });
    return { message, conversation };
  }
}
