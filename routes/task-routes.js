import { Router } from "express";
import {
  getAllTasks,
  creatTask,
  updateTask,
  deleteTask,
} from "../controllers/task-controller.js";

const router = Router();

router.get("/boards/:boardId/columns/:columnId/tasks", getAllTasks);
router.post("/boards/:boardId/columns/:columnId/tasks", creatTask);
router.put("/boards/:boardId/columns/:columnId/tasks/:taskId", updateTask);
router.delete("/boards/:boardId/columns/:columnId/tasks/:taskId", deleteTask);

export default router;
