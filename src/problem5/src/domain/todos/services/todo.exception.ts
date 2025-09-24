import { BaseException } from "../../../lib/exceptions/exception";

export class NotFoundException extends BaseException {
  constructor(id: string) {
    super(`Resource with id ${id} not found`, 404);
  }
}

export class CannotDeleteException extends BaseException{
  constructor(){
    super("Cannot delete this resource")
  }
}