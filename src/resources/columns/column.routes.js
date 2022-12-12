import { Router } from 'express';
import validator from '../../utils/validation/validator.js';
import {
  getAllColumns,
  getColumnById,
  creatColumn,
  deleteColumn,
  updateColumn,
} from './column.controllers.js';
import schemas from '../../utils/validation/schemas.js';

const { boardId, columnId, column } = schemas;
const router = Router();

router
  .get('/boards/:boardId/columns', validator(boardId, 'params'), getAllColumns)
  .get('/boards/:boardId/columns/:columnId', validator(columnId, 'params'), getColumnById)
  .post(
    '/boards/:boardId/columns',
    validator(boardId, 'params'),
    validator(column, 'body'),
    creatColumn
  )
  .delete('/boards/:boardId/columns/:columnId', validator(columnId, 'params'), deleteColumn)
  .put(
    '/boards/:boardId/columns/:columnId',
    validator(columnId, 'params'),
    validator(column, 'body'),
    updateColumn
  );

export default router;
