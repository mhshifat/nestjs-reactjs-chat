import { User } from "src/utils/typeorm";
import { UserCredentialDetails } from "src/utils/types";

export interface IAuthService {
  validateUser(userCredentialsDetails: UserCredentialDetails): Promise<User | null>;
}