import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body); // เซ็ตค่าที่ผ่านการ validate แล้วกลับเข้าไป
      next();
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors, // ส่งรายละเอียด error ของ Zod กลับไป
      });
    }
  };
};
