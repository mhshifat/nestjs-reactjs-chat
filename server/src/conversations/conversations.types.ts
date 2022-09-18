import { Conversation, User } from './../utils/typeorm';
import { CreateConversationDetails } from 'src/utils/types';

export interface IConversationsService {
  createConversation(user: User, dto: CreateConversationDetails): Promise<Conversation>;
}