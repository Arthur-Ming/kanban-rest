import Router from 'koa-router';
import validator from '../../utils/validation/validator.js';
import {
  getAllBoards,
  getBoardById,
  creatBoard,
  deleteBoard,
  updateBoard,
  updateColumnsOrder,
} from './board.controllers.js';
import schemas from '../../utils/validation/schemas.js';

const { boardId, board, columnsOrder } = schemas;
const boardsRouter = Router({ prefix: '/boards' });

boardsRouter
  .get('/', getAllBoards)
  .get('/:boardId', validator(boardId, 'params'), getBoardById)
  .post('/', validator(board, 'body'), creatBoard)
  .delete('/:boardId', validator(boardId, 'params'), deleteBoard)
  .put('/:boardId', validator(boardId, 'params'), validator(board, 'body'), updateBoard)
  .put(
    '/:boardId/columns/order',
    validator(boardId, 'params'),
    validator(columnsOrder, 'body'),
    updateColumnsOrder
  );

export default boardsRouter;
