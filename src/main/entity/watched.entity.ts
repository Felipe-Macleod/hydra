import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class Watched {
	@PrimaryGeneratedColumn()
	id: number;
	
	@Column("text", { unique: true })
	objectID: string;
	
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}