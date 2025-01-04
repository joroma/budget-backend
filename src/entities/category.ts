import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "nvarchar", length: 20 })
  name!: string;

  @Column({ type: "decimal", precision: 2 })
  amount!: number;
}
