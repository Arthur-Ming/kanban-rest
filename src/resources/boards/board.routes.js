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
import { asyncHandler } from '../../utils/asyncHandler.js';

const { boardId, board } = schemas;
const router = Router();

router
  .get('/boards', asyncHandler(getAllBoards))
  .get('/boards/:boardId', validator(boardId, 'params'), asyncHandler(getBoardById))
  .post('/boards', validator(board, 'body'), asyncHandler(creatBoard))
  .delete('/boards/:boardId', validator(boardId, 'params'), asyncHandler(deleteBoard))
  .put(
    '/boards/:boardId',
    validator(boardId, 'params'),
    validator(board, 'body'),
    asyncHandler(updateBoard)
  );

export default router;
