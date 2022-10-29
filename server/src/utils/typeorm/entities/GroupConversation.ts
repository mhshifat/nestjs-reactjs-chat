import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@Entity({ name: "group_conversations" })
export class GroupConversation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: number;

  @UpdateDateColumn({ name: "updated_at" })
  lastMessageSentAt: Date;

  @Column({ nullable: true })
  title: string;

  @OneToOne(() => Message)
  @JoinColumn({ name: "last_message_sent" })
  lastMessageSent: Message;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: User;

  @ManyToMany(() => User, (user) => user.groupConversations)
  @JoinTable()
  users: User[];

  @OneToMany(() => Message, (message) => message.groupConversation, {
    cascade: ["insert", "update", "remove"]
  })
  @JoinColumn()
  messages: Message[];
}