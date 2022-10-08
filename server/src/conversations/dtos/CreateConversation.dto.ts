import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}