import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity('watched')
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