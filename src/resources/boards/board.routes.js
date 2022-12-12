import { Router } from 'express';
import validator from '../../utils/validation/validator.js';
import {
  getAllBoards,
  getBoardById,
  creatBoard,
  deleteBoard,
  updateBoard,
} from './board.controllers.js';
import schemas from '../../utils/validation/schemas.js';

const { boardId, board } = schemas;
const router = Router();

router
  .get('/boards', getAllBoards)
  .get('/boards/:boardId', validator(boardId, 'params'), getBoardById)
  .post('/boards', validator(board, 'body'), creatBoard)
  .delete('/boards/:boardId', validator(boardId, 'params'), deleteBoard)
  .put('/boards/:boardId', validator(boardId, 'params'), validator(board, 'body'), updateBoard);

export default router;
