import { Router } from "express";
import {
  getAllBoards,
  getBoardById,
  creatBoard,
} from "../controllers/board.js";

const router = Router();

router.get("/boards", getAllBoards);
router.get("/boards/:boardId", getBoardById);
router.post("/boards", creatBoard);

export default router;
