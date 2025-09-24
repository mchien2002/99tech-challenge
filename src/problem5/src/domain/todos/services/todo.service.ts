import { Like } from "typeorm";
import {
  TodoCreate,
  TodoDetail,
  TodoResponse,
  TodoUpdate,
} from "../dtos/todo.dto";
import { Todo } from "../entities/todo.entity";
import { TodoRepository } from "../repositories/todo.repository";
import {
  CannotDeleteException,
  NotFoundException,
} from "./todo.exception";

export class TodoService {
  private repository: TodoRepository;
  constructor() {
    this.repository = new TodoRepository();
  }
  async create(newOne: TodoCreate): Promise<TodoDetail> {
    var newTodo = (await this.repository.create(newOne)) as Todo;
    return new TodoDetail(newTodo);
  }

  async fetch(params?: any): Promise<TodoResponse[]> {
    const { title, completed } = params ?? {};

    const where: any = {};

    if (title) {
      where.title = Like(`%${title}%`);
    }

    if (completed !== undefined) {
      where.completed = completed === "true" || completed === true;
    }

    const data = await this.repository.findAll({ where });
    return data.map((todo: Todo) => new TodoResponse(todo));
  }

  async findById(id: string): Promise<TodoDetail> {
    const todo = (await this.repository.findById(id)) as Todo;
    if (!todo) {
      throw new NotFoundException(id);
    }
    return new TodoDetail(todo);
  }

  async update(id: string, newTodo: TodoUpdate): Promise<TodoDetail> {
    const todo = (await this.repository.update(id, newTodo)) as Todo;
    if (!todo) {
      throw new NotFoundException(id);
    }
    return new TodoDetail(todo);
  }

  async delete(id: string): Promise<boolean> {
    var is_delete = await this.repository.delete(id);
    if (!is_delete) {
      throw new CannotDeleteException();
    }
    return is_delete;
  }
}
