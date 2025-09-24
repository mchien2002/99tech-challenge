import { Entity, Column, CreateDateColumn } from "typeorm";
import { MBaseEntity } from "../../../lib/base.entity";

@Entity()
export class Todo extends MBaseEntity {
  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  completed!: boolean;

  @Column({ type: "int", default: 0 })
  progress!: number;
}
