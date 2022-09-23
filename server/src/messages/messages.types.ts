import { CreateMessageDetails } from 'src/utils/types';
import { Message, User } from '../utils/typeorm';

export interface IMessagesService {
  createMessage(user: User, createMessageDetails: CreateMessageDetails): Promise<Message>;
}