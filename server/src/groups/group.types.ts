import { GroupConversation, User } from "src/utils/typeorm";
import { CreateGroupDetails } from "src/utils/types";

export interface IGroupService {
  createGroup(user: User, dto: CreateGroupDetails): Promise<GroupConversation>
  getGroups(user: User): Promise<GroupConversation[]>
}