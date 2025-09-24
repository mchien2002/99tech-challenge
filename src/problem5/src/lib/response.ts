import { Request, Response, NextFunction } from "express";
export class BaseResponse<T> {
  success: boolean;
  message: string;
  data: T | null;

  constructor(data: T | null = null, message = "Success", success = true) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export function withResponse(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler(req, res, next);
      res.json(new BaseResponse(result));
    } catch (err) {
      next(err);
    }
  };
}
