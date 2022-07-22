const express = require("express");
const {
  getAllBoards,
  getBoardById,
  creatBoard,
} = require("../controllers/board-controller");

const router = express.Router();

router.get("/boards", getAllBoards);
router.get("/boards/:boardId", getBoardById);
router.post("/boards", creatBoard);

module.exports = router;
