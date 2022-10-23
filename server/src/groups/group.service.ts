import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserService } from "src/users/users.types";
import { Services } from "src/utils/constants";
import { User, GroupConversation } from "src/utils/typeorm";
import { CreateGroupDetails } from "src/utils/types";
import { Repository } from "typeorm";
import { IGroupService } from "./group.types"

@Injectable()
export class GroupService implements IGroupService {
  constructor(
    @InjectRepository(GroupConversation) private readonly groupRepo: Repository<GroupConversation>,
    @Inject(Services.USERS) private readonly userService: IUserService,
  ) {}
  
  async createGroup(user: User, dto: CreateGroupDetails): Promise<GroupConversation> {
    const users = await Promise.all(dto.users.map(userEmail => this.userService.findUser({ email: userEmail })));
    users.push(user);
    const groupObj = this.groupRepo.create({ users, creator: user, title: dto.title });
    return this.groupRepo.save(groupObj);
  }
}