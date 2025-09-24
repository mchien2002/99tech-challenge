// src/middlewares/validateRequest.ts
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateRequest(dto_class: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dto_class, req.body);
    const errors: ValidationError[] = await validate(dtoObj);

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }
    (req as any).dataBody = dtoObj;
    next();
  };
}
