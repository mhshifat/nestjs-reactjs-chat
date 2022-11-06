import { User } from "./entities/User";
import { Session } from "./entities/Session";
import { Conversation } from "./entities/Conversation";
import { Message } from "./entities/Message";
import { GroupConversation } from "./entities/GroupConversation";
import { GroupMessage } from "./entities/GroupMessage";

export const entities = [User, Session, Conversation, Message, GroupConversation, GroupMessage];
export { User, Session, Conversation, Message, GroupConversation, GroupMessage };
export default entities;