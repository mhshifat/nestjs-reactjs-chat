import { CreateMessageDetails, DeleteMessageDetails } from 'src/utils/types';
import { Message, User } from '../utils/typeorm';

export interface IMessagesService {
  getMessage(id: number): Promise<Message | null>;
  getMessages(conversationId: number): Promise<Message[]>;
  createMessage(user: User, createMessageDetails: CreateMessageDetails): Promise<Message>;
  deleteMessage(user: User, deleteMessageDetails: DeleteMessageDetails): Promise<Message>;
}