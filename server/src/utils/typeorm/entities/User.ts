import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { GroupConversation } from "./GroupConversation";
import { Message } from "./Message";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Message, (message) => message.author, {
    cascade: ["insert", "update", "remove"]
  })
  @JoinColumn()
  messages: Message[]

  @ManyToMany(() => GroupConversation, (conversation) => conversation.users)
  groupConversations: GroupConversation[];
}