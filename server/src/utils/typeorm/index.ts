import { User } from "./entities/User";
import { Session } from "./entities/Session";
import { Conversation } from "./entities/Conversation";
import { Message } from "./entities/Message";
import { GroupConversation } from "./entities/GroupConversation";

export const entities = [User, Session, Conversation, Message, GroupConversation];
export { User, Session, Conversation, Message, GroupConversation };
export default entities;