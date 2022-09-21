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
}