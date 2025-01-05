import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Account } from "./account";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date', })
  date!: Date;

  @Column({ type: 'decimal', precision: 2, default: 0 })
  inflow!: number;

  @Column({ type: 'decimal', precision: 2, default: 0 })
  outflow!: number;

  @Column({ type: 'nvarchar', length: 100 })
  memo?: string;

  @Column({ type: 'boolean', default: true })
  isCompleted!: boolean;

  @ManyToOne(() => Category, (category) => category.transactions,)
  @JoinColumn({ referencedColumnName: 'id', foreignKeyConstraintName: 'fkCategory' })
  category!: Category;

  @ManyToOne(() => Account, (account) => account.transactions,)
  @JoinColumn({ referencedColumnName: 'id', foreignKeyConstraintName: 'fkAccount' })
  account!: Account;

}
