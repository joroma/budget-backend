import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Entry } from "./entry";
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "nvarchar", length: 20 })
  name!: string;

  @Column({ type: "decimal", precision: 2 })
  amount!: number;

  @OneToMany(() => Entry, (entry) => entry.category)
  entries?: Entry[]
}
