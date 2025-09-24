// src/middlewares/errorHandler.ts
import { isInstance } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { BaseException } from "../exceptions/exception";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  if (isInstance(err, BaseException)) {
    res.status(err.statusCode).json({
      success: false,
      status_code: err.statusCode,
      message: "Error",
      error: err.message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message || err,
    });
  }
}
