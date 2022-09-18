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

  async createParticipant(dto: CreateParticipantDetails): Promise<Participant> {
    const participant = await this.participantRepo.create(dto);
    return this.participantRepo.save(participant);
  }

  findParticipant(params: FindParticipantParams): Promise<Participant | null> {
    return this.participantRepo.findOne(params);
  }
}
