import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupConversation } from "./GroupConversation";
import { User } from "./User";

@Entity({ name: "group_messages" })
export class GroupMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => User, user => user.messages)
  @JoinColumn()
  author: User;

  @ManyToOne(() => GroupConversation, (conversation) => conversation.messages)
  groupConversation: GroupConversation;
}