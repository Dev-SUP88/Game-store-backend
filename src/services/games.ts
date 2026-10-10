import { eq, and, ne, isNull } from "drizzle-orm";
import { v7 as uuidv7 } from 'uuid';
import { db } from "../config/db.ts";
import { games } from "../db/schema/index.ts";

export async function getAllGames() {
  return await db
    .select()
    .from(games)
    .where(isNull(games.deletedAt));
} 

export async function getGameById(id: string) {
  const [ game ] = await db
    .select()
    .from(games)
    .where(and(
      eq(games.id, id),
      isNull(games.deletedAt)
      )
    );

  if (!game) {
    throw new Error("NOT_FOUND");
  }
  
  return game;
} 

export async function insertGame(input) {
  const [existingGame] = await db
    .select()
    .from(games)
    .where(
      and(
        eq(games.name, input.name),
        isNull(games.deletedAt)
      )
    );

  if (existingGame) {
    throw new Error("THIS GAME ALREADY EXISTS");
  }

  const newId = uuidv7();

  // 1. สั่ง Insert ลง Database
  await db
    .insert(games)
    .values({
      ...input,
      id: newId,
    });

  // 2. Query ดึงข้อมูลตัวที่เพิ่งบันทึกจริง ๆ กลับมาจาก DB (พร้อมค่า Default เช่น timestamp)
  const [newGame] = await db
    .select()
    .from(games)
    .where(eq(games.id, newId));

  return newGame;
}

export async function updateGame(id: string, input: Partial<typeof games.$inferInsert>) {
  const [existingGame] = await db
  .select()
  .from(games)
  .where(and(
    eq(games.id, id),
    isNull(games.deletedAt)
    )
  );

  if(!existingGame) {
    throw new Error("NOT_FOUND_GAME_ID_FOR_EDIT");
  }

  if(input.name && input.name !== existingGame.name) {
    const [duplicateName] = await db
    .select()
    .from(games)
    .where(
      and(
        eq(games.name, input.name),
        ne(games.id, id),
        isNull(games.deletedAt)
      )
    );

    if(duplicateName) {
      throw new Error("THIS_GAME_NAME_IS_ ALREADY_IN_USE");
    }
  }

  // 1. สั่ง Update ข้อมูล
  await db
  .update(games)
  .set({
    ...input,
    updatedAt: new Date()
  })
  .where(eq(games.id, id));

  // 2. Query ดึงข้อมูลล่าสุดหลังอัปเดตกลับมาจาก DB
  const [updatedGame] = await db
  .select()
  .from(games)
  .where(eq(games.id, id));

  return updatedGame;
}

export async function softDeleteGame(id: string) {
  const [ existingGame ] = await db
  .select()
  .from(games)
  .where(
    and(
      eq(games.id, id),
      isNull(games.deletedAt)
    )
  );

  if(!existingGame) {
    throw new Error("NOT_FOUND_GAME_ID_FOR_DELETE");
  }

  // 1. สั่ง Soft Delete (อัปเดต deletedAt)
  await db
  .update(games)
  .set({ deletedAt: new Date() })
  .where(eq(games.id, id));

  // 2. Query ดึงข้อมูลตัวที่ถูกลบกลับมาจาก DB
  const [ deletedGame ] = await db
    .select()
    .from(games)
    .where(eq(games.id, id));

  return deletedGame;
}
