import { Router } from "express";
import {
  getAllColumns,
  getColumnById,
  creatColumn,
  updateColumn,
  deleteColumn,
} from "../controllers/column.js";

const router = Router();

router.get("/boards/:boardId/columns", getAllColumns);
router.get("/boards/:boardId/columns/:columnId", getColumnById);
router.post("/boards/:boardId/columns", creatColumn);
router.put("/boards/:boardId/columns/:columnId", updateColumn);
router.delete("/boards/:boardId/columns/:columnId", deleteColumn);

export default router;
