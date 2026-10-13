import type { Request, Response, NextFunction } from "express";
import * as gameService from "../services/games.ts";

export async function getAllGamesHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const games = await gameService.getAllGames();
    return res.status(200).json({ success: true, data: games });
  } catch (error) {
    next(error); // ส่งให้ Global Error Handler จัดการทั้งหมด
  }
}

export async function getGameByIdHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const game = await gameService.getGameById(req.params.id);
    return res.status(200).json({ success: true, data: game });
  } catch (error) {
    next(error);
  }
}

export async function createGameHandler(req: Request, res: Response, next: NextFunction) {
  try {
    // ข้อมูลใน req.body สะอาดและผ่านการ Validate จาก Middleware มาแล้ว
    const newGame = await gameService.insertGame(req.body);
    return res.status(201).json({ success: true, data: newGame });
  } catch (error) {
    next(error);
  }
}

export async function updateGameHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const updatedGame = await gameService.updateGame(id, req.body);
    return res.status(200).json({ success: true, data: updatedGame });
  } catch (error) {
    next(error);
  }
}

export async function deleteGameHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const deletedGame = await gameService.softDeleteGame(id);
    return res.status(200).json({ success: true, data: deletedGame, message: "Game deleted successfully" });
  } catch (error) {
    next(error);
  }
}
