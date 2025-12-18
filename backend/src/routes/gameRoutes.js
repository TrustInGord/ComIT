import { Router } from "express";
import { updateGameState, getGameState } from "../controllers/gameController.js";

const gameRouter = Router();

gameRouter.put("/:userId", updateGameState);
gameRouter.get("/:userId", getGameState);

export { gameRouter };