import { describe, it, expect } from "vitest";
import { 
  getAllGames, 
  getGameById, 
  insertGame, 
  updateGame, 
  softDeleteGame 
} from "../../services/games.ts";

describe("Games Service Tests", () => {
  let createdId: string;
  const uniqueSuffix = Date.now();
  const gameName = `Test Game ${uniqueSuffix}`;

  it("1. ควรสามารถสร้างเกมใหม่ได้สำเร็จ (insertGame)", async () => {
    const newGame = await insertGame({ 
      name: gameName,
      slug: `test-game-${uniqueSuffix}`,
      iconUrl: "https://example.com/icon.png"
    });

    expect(newGame).toBeDefined();
    expect(newGame.name).toBe(gameName);
    expect(newGame.id).toBeDefined();
    
    createdId = newGame.id;
  });

  it("2. ควรพ่น Error เมื่อพยายามสร้างเกมชื่อซ้ำ", async () => {
    await expect(
      insertGame({ 
        name: gameName,
        slug: `duplicate-slug-${uniqueSuffix}` 
      })
    ).rejects.toThrow("THIS GAME ALREADY EXISTS");
  });

  it("3. ควรดึงรายการเกมทั้งหมดได้ (getAllGames)", async () => {
    const gamesList = await getAllGames();
    expect(Array.isArray(gamesList)).toBe(true);
    
    const found = gamesList.find((g: any) => g.id === createdId);
    expect(found).toBeDefined();
  });

  it("4. ควรดึงข้อมูลเกมด้วย ID ที่มีอยู่ได้ (getGameById)", async () => {
    const game = await getGameById(createdId);
    expect(game).toBeDefined();
    expect(game.id).toBe(createdId);
  });

  it("5. ควรพ่น Error เมื่อค้นหาด้วย ID ปลอม/ไม่มีอยู่จริง", async () => {
    await expect(
      getGameById("01900000-0000-7000-8000-000000000000")
    ).rejects.toThrow("NOT_FOUND");
  });

  it("6. ควรสามารถอัปเดตข้อมูลเกมได้ (updateGame)", async () => {
    const updatedName = `Updated Game ${uniqueSuffix}`;
    const updatedGame = await updateGame(createdId, { name: updatedName });

    expect(updatedGame.name).toBe(updatedName);
  });

  it("7. ควรสามารถลบข้อมูลแบบ Soft Delete ได้ (softDeleteGame)", async () => {
    const deletedGame = await softDeleteGame(createdId);
    expect(deletedGame.deletedAt).not.toBeNull();
  });

  it("8. ควรค้นหาเกมที่ถูก Soft Delete ไปแล้วไม่เจอ (ต้องขึ้น NOT_FOUND)", async () => {
    await expect(
      getGameById(createdId)
    ).rejects.toThrow("NOT_FOUND");
  });
});
