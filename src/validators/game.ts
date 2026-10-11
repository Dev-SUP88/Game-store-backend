import { z } from "zod";

/**
 * Zod Schema สำหรับสร้างเกมใหม่ (Create)
 */
export const createGameSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be at most 100 characters"),

  slug: z
    .string({ required_error: "Slug is required" })
    .min(1, "Slug cannot be empty")
    .max(100, "Slug must be at most 100 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format (e.g., game-name-123)"), // บังคับรูปแบบ slug (lowercase และคั่นด้วยขีดกลาง)

  icon_url: z
    .string()
    .url("Invalid URL format")
    .max(255, "Icon URL must be at most 255 characters")
    .optional()
    .nullable(),
});

/**
 * Zod Schema สำหรับอัปเดตเกม (Update)
 * ใช้ .partial() เพื่อให้ทุกฟิลด์กลายเป็น Optional (จะส่งมาทั้งหมดหรือส่งมาแค่บางฟิลด์ก็ได้)
 */
export const updateGameSchema = createGameSchema.partial();

// Type Inference สำหรับนำไปใช้ต่อใน TypeScript
export type CreateGameInput = z.infer<typeof createGameSchema>;
export type UpdateGameInput = z.infer<typeof updateGameSchema>;
