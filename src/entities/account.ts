import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "./entry";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', type: 'nvarchar', length: 20 })
  name!: string;

  @OneToMany(() => Entry, (entry) => entry.account)
  entries?: entry[];
}
