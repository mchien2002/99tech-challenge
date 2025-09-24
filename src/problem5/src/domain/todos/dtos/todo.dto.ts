import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { Todo } from "../entities/todo.entity";

export class TodoResponse {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;

  constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.completed = todo.completed;
    this.createdAt = todo.createdAt.toISOString();
    this.updatedAt = todo.updatedAt.toISOString();
  }
}

export class TodoDetail {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
  progress?: number;
  createdAt: string;
  updatedAt: string;

  constructor(todo: Todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.completed = todo.completed;
    this.description = todo.description;
    this.progress = todo.progress;
    this.createdAt = todo.createdAt.toISOString();
    this.updatedAt = todo.updatedAt.toISOString();
  }
}
export class TodoCreate {
  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  progress: number = 0;
}

export class TodoUpdate {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  progress?: number;
}
