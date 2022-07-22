const express = require("express");
const {
  getAllTasks,
  creatTask,
  updateTask,
  deleteTask,
} = require("../controllers/task-controller");

const router = express.Router();

router.get("/boards/:boardId/columns/:columnId/tasks", getAllTasks);
router.post("/boards/:boardId/columns/:columnId/tasks", creatTask);
router.put("/boards/:boardId/columns/:columnId/tasks/:taskId", updateTask);
router.delete("/boards/:boardId/columns/:columnId/tasks/:taskId", deleteTask);

module.exports = router;
