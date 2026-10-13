import express from "express";
import gameRouter from "./routers/game.ts";
import { errorHandler } from "./middlewares/error.ts";

const app = express();

app.use(express.json());

// 1. ลงทะเบียน Routes
app.use("/api/games", gameRouter);

// 2. ลงทะเบียน Global Error Handler (ต้องอยู่ท้ายสุดเสมอ)
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
