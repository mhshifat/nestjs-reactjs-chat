export type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type UserCredentialsParams = {
  email: string;
  password: string;
}

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  createdAt: string;
  messages?: Message[];
  lastMessageSent?: Message;
}

export type Message = {
  id: number;
  content: string;
  createdAt: string;
  author: User;
  conversation?: Conversation;
}

export type MessageEventPayload = {
  id: number;
  createdAt: string;
  content: string;
  author: User;
  conversation: Conversation;
}

export type CreateMessageParams = {
  content: string;
  conversationId: number;
}

export type CreateConversationParams = {
  email: string;
  message: string;
}

export type DeleteMessageParams = {
  messageId: number;
  conversationId: number;
}

export type UpdateMessageParams = {
  messageId: number;
  payload: {
    key: keyof Message;
    value: Message[keyof Message];
  };
}

export type GetMessagesResponse = {
  conversationId: number;
  messages: Message[]
}