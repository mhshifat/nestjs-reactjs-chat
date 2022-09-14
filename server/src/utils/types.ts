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