const express = require("express");
const {
  getAllColumns,
  getColumnById,
  creatColumn,
  updateColumn,
  deleteColumn
} = require("../controllers/column-controller");

const router = express.Router();

router.get("/boards/:boardId/columns", getAllColumns);
router.get("/boards/:boardId/columns/:columnId", getColumnById);
router.post("/boards/:boardId/columns", creatColumn);
router.put("/boards/:boardId/columns/:columnId", updateColumn);
router.delete("/boards/:boardId/columns/:columnId", deleteColumn);

module.exports = router;
