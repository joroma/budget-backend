import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'name', type: 'nvarchar', length: 20 })
  name!: string;

  @Column({ name: 'amount', type: 'decimal', precision: 2 })
  amount!: number;

}
