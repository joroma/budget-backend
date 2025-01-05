import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Transaction } from "./transaction";
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "nvarchar", length: 20 })
  name!: string;

  @Column({ type: "decimal", precision: 2 })
  amount!: number;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions?: Transaction[]
}
