import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from './Conversation';
import { User } from "./User";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: number;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn()
  author: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  @JoinColumn()
  conversation: Conversation;
}