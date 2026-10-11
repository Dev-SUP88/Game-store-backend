import { describe, it, expect, vi, beforeEach } from "vitest";
import { Request, Response } from "express";
import * as gameController from "../../controllers/games.ts";
import * as gameService from "../../services/games.ts";
import { AppError } from "../../error/app-error.ts";

// Mock ตัว Service เพื่อไม่ให้ต่อไป Database จริง
vi.mock("../../services/games.ts");

describe("Game Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    vi.clearAllMocks();

    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
  });

  describe("getAllGamesHandler", () => {
    it("should return 200 and a list of games when service succeeds", async () => {
      const fakeGames = [{ id: "1", name: "Valorant", slug: "valorant" }];
      vi.mocked(gameService.getAllGames).mockResolvedValue(fakeGames as any);

      await gameController.getAllGamesHandler(
        mockReq as Request,
        mockRes as Response,
        vi.fn()
      );

      expect(gameService.getAllGames).toHaveBeenCalledTimes(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: fakeGames,
      });
    });
  });

  describe("getGameByIdHandler", () => {
    it("should return 200 and the game when found", async () => {
      mockReq.params = { id: "game-uuid-123" };
      const fakeGame = { id: "game-uuid-123", name: "Roblox", slug: "roblox" };
      vi.mocked(gameService.getGameById).mockResolvedValue(fakeGame as any);

      await gameController.getGameByIdHandler(
        mockReq as Request,
        mockRes as Response,
        vi.fn()
      );

      expect(gameService.getGameById).toHaveBeenCalledWith("game-uuid-123");
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ success: true, data: fakeGame });
    });
  });

  describe("createGameHandler", () => {
    it("should return 201 and the created game when input is valid", async () => {
      const inputData = { name: "Minecraft", slug: "minecraft" };
      mockReq.body = inputData;
      
      const createdGame = { id: "new-uuid", ...inputData };
      vi.mocked(gameService.insertGame).mockResolvedValue(createdGame as any);

      await gameController.createGameHandler(
        mockReq as Request,
        mockRes as Response,
        vi.fn()
      );

      expect(gameService.insertGame).toHaveBeenCalledWith(inputData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: createdGame,
      });
    });
  });
});
