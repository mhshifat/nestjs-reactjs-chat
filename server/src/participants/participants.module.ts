import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/constants';
import { Participant } from 'src/utils/typeorm';
import { ParticipantsController } from './participants.controller';
import { ParticipantsService } from './participants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  controllers: [ParticipantsController],
  providers: [{
    provide: Services.PARTICIPANTS,
    useClass: ParticipantsService
  }],
  exports: [{
    provide: Services.PARTICIPANTS,
    useClass: ParticipantsService
  }],
})
export class ParticipantsModule { }
