import { Router } from "express";
import * as gameController from "../controllers/games.ts";
import { validateBody } from "../middlewares/validate.ts";
import { createGameSchema, updateGameSchema } from "../validators/game.ts";

const router = Router();

router.get("/", gameController.getAllGamesHandler);
router.get("/:id", gameController.getGameByIdHandler);

// เอา validateBody มาแปะตรงกลางก่อนเข้า Controller
router.post("/", validateBody(createGameSchema), gameController.createGameHandler);
router.patch("/:id", validateBody(updateGameSchema), gameController.updateGameHandler);

router.delete("/:id", gameController.deleteGameHandler);

export default router;
