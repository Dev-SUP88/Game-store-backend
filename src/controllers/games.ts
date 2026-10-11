import { Request, Response, NextFunction } from "express";
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
