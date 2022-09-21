import { Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "participants" })
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;
}