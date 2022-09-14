import { UserCredentialDetails } from "src/utils/types";

export interface IAuthService {
  validateUser(userCredentialsDetails: UserCredentialDetails);
}