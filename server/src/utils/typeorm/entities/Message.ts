import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from './Conversation';
import { User } from "./User";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ name: "created_at" })
  createdAt: number;

  @ManyToOne(() => User, user => user.messages)
  author: User;

  @OneToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;
}