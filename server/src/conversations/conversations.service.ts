import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Conversation, User, Participant } from 'src/utils/typeorm';
import { CreateConversationDetails } from 'src/utils/types';
import { IConversationsService } from './conversations.types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { ParticipantsService } from 'src/participants/participants.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ConversationsService implements IConversationsService {
  constructor(
    @InjectRepository(Conversation) private readonly conversationRepo: Repository<Conversation>,
    @Inject(Services.PARTICIPANTS) private readonly participantService: ParticipantsService,
    @Inject(Services.USERS) private readonly userService: UsersService,
  ) { }

  async createConversation(user: User, payload: CreateConversationDetails): Promise<Conversation> {
    const participants: Participant[] = [];
    const userDb = await this.userService.findUser({ id: user.id });
    if (!userDb.participant) {
      const participant = await this.createParticipantAndSaveUser(userDb, payload.authorId);
      participants.push(participant);
    } else participants.push(userDb.participant);
    const recipient = await this.userService.findUser({ id: payload.recipientId });
    if (!recipient) throw new HttpException("Recipient not found", HttpStatus.BAD_REQUEST);
    if (!recipient.participant) {
      const participant = await this.createParticipantAndSaveUser(recipient, payload.recipientId);
      participants.push(participant);
    } else participants.push(recipient.participant);
    const newConversation = this.conversationRepo.create({
      participants
    });
    return this.conversationRepo.save(newConversation);
  }

  public async createParticipantAndSaveUser(user: User, id: number) {
    const newParticipant = await this.participantService.createParticipant({ id });
    user.participant = newParticipant;
    await this.userService.saveUser(user);
    return newParticipant;
  }
}
