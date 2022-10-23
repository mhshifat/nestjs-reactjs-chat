import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation } from './Conversation';
import { GroupConversation } from "./GroupConversation";
import { User } from "./User";

@Entity({ name: "messages" })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn()
  author: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @ManyToOne(() => GroupConversation, (conversation) => conversation.messages)
  groupConversation?: GroupConversation;
}