import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config()
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  
  DB_HOST: z.string({ required_error: 'DB_HOST is required' }).min(1),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string({ required_error: 'DB_USER is required' }).min(1),
  DB_PASSWORD: z.string({ required_error: 'DB_PASSWORD is required' }).min(1),
  DB_NAME: z.string({ required_error: 'DB_NAME is required' }).min(1),

  
  DB_CONNECTION_LIMIT: z.coerce.number().default(10),
  DB_QUEUE_LIMIT: z.coerce.number().default(0),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ [FATAL] Invalid environment variables:');
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  
  return result.data;
};

export const env = parseEnv();
