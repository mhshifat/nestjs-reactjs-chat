import { Conversation, User } from './../utils/typeorm';
import { CreateConversationDetails } from 'src/utils/types';
import { Participant } from 'src/utils/typeorm';

export interface IConversationsService {
  createConversation(user: User, dto: CreateConversationDetails): Promise<Conversation>;
  find(id: number): Promise<Participant[]>;
  findConversationById(id: number): Promise<Conversation>;
}