import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { Routes, Services } from "src/utils/constants";
import { AuthUser } from "src/utils/decorators";
import { User } from "src/utils/typeorm";
import { AuthenticatedGuard } from '../auth/utils/Guards';
import { IGroupService } from "./group.types";
import { CreateGroupDto } from "./dtos/CreateGroup.dto";

@Controller(Routes.GROUPS)
@UseGuards(AuthenticatedGuard)
export class GroupController {
  constructor(
    @Inject(Services.GROUPS) private readonly groupService: IGroupService
  ) {}

  @Post()
  async createGroup(
    @AuthUser() user: User,
    @Body() body: CreateGroupDto
  ) {
    const group = await this.groupService.createGroup(user, body);
    return group;
  }
}