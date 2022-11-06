import { IGroupMessagesService } from "./group-messages.types";
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupMessage } from "../utils/typeorm";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupMessagesService implements IGroupMessagesService {
  constructor(
    @InjectRepository(GroupMessage) private readonly groupMessageRepo: Repository<GroupMessage>
  ) {}

  getGroupMessages() {
    throw new Error("Method not implemented.");
  }
}