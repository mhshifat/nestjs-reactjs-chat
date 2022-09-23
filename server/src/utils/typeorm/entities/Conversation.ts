import { CreateDateColumn, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./Message";
import { User } from "./User";

@Entity({ name: "conversations" })
@Index(["creator.id", "recipient.id"], { unique: true })
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: number;

  @OneToOne(() => Message)
  @JoinColumn({ name: "last_message_sent" })
  lastMessageSent: Message;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  recipient: User;

  @OneToMany(() => Message, (message) => message.conversation, {
    cascade: ["insert", "update", "remove"]
  })
  @JoinColumn()
  messages: Message[];
}