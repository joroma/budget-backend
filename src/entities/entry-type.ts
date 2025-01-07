import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class EntryType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'nvarchar', length: 50 })
  name!: string;

}

