import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateParticipantDto {
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @IsNumber()
  @IsNotEmpty()
  recipientId: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}