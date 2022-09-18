import { CreateParticipantDetails, FindParticipantParams } from '../utils/types';
import { Participant } from './../utils/typeorm';

export interface IParticipantsService {
  findParticipant(params: FindParticipantParams): Promise<Participant | null>;
  createParticipant(dto: CreateParticipantDetails): Promise<Participant>;
}