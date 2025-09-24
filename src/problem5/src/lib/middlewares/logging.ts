// src/middlewares/logger.middleware.ts
import { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log("========== REQUEST LOG ==========");
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.log("Status:", res.statusCode);
    console.log("Params:", JSON.stringify(req.params));
    console.log("Query:", JSON.stringify(req.query));
    console.log("Body:", JSON.stringify(req.body));
    console.log(`Duration: ${duration}ms`);
    console.log("=================================");
  });

  next();
}
