import { Message, User } from "./typeorm";

export type CreateUserDetails = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type UserCredentialDetails = {
  email: string;
  password: string;
}

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>

export type CreateParticipantDetails = {
  id: number;
}

export type CreateConversationDetails = {
  email: string;
  message: string;
}

export type FindParticipantParams = Partial<{
  id: number;
}>

export interface AuthenticatedRequest extends Request {
  user: User;
}

export type CreateMessageDetails = {
  conversationId: number;
  content: string;
}

export type DeleteMessageDetails = {
  conversationId: number;
  messageId: number;
}

export type PatchMessagePayload = {
  key: keyof Message;
  value: Message[keyof Message];
}