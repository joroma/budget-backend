import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', type: 'nvarchar', length: 20 })
  name!: string;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions?: Transaction[];
}
