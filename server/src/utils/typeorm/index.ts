import { User } from "./entities/User";
import { Session } from "./entities/Session";
import { Participant } from "./entities/Participant";
import { Conversation } from "./entities/Conversation";

export const entities = [User, Session, Participant, Conversation];
export { User, Session, Participant, Conversation };
export default entities;