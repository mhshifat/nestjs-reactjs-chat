import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from 'src/utils/typeorm';
import { CreateParticipantDetails, FindParticipantParams } from 'src/utils/types';
import { Repository } from 'typeorm';
import { IParticipantsService } from './participants.types';

@Injectable()
export class ParticipantsService implements IParticipantsService {
  constructor(
    @InjectRepository(Participant) private readonly participantRepo: Repository<Participant>
  ) { }

  findParticipantConversations(id: number) {
    return this.participantRepo
      .createQueryBuilder("participant")
      .leftJoinAndSelect("participant.conversations", "conversations")
      .where("participant.id = :id", { id })
      .leftJoinAndSelect("conversation.participants", "participants")
      .leftJoin("participants.user", "user")
      .addSelect(["user.firstName", "user.lastName", "user.email", "user.id"])
      .getOne()
  }

  async createParticipant(dto: CreateParticipantDetails): Promise<Participant> {
    const participant = await this.participantRepo.create(dto);
    return this.participantRepo.save(participant);
  }

  findParticipant(params: FindParticipantParams): Promise<Participant | null> {
    return this.participantRepo.findOne(params);
  }
}
