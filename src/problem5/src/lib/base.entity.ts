import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  BeforeInsert,
} from "typeorm";
import { nanoid } from "nanoid";

export abstract class MBaseEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt!: Date;

  @BeforeInsert()
  generateId() {
    this.id = nanoid(21);
  }
}
