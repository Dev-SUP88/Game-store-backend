import type { Request, Response, NextFunction } from "express";
import { AppError } from "../error/app-error.ts";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  // ถ้ารู้จัก Error นี้ (เป็น AppError ที่เรากำหนดเอง)
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  // กรณี Error แปลกปลอมอื่นๆ เช่น Database ล่ม
  console.error("UNEXPECTED_ERROR:", error);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
