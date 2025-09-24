import { Todo } from "../entities/todo.entity";
import { BaseRepository } from "../../../lib/base.repository";

export class TodoRepository extends BaseRepository<Todo> {
  constructor() {
    super(Todo);
  }
}
