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
import { asyncHandler } from '../../utils/asyncHandler.js';

const { boardId, columnId, column } = schemas;
const router = Router();

router
  .get('/boards/:boardId/columns', validator(boardId, 'params'), asyncHandler(getAllColumns))
  .get(
    '/boards/:boardId/columns/:columnId',
    validator(columnId, 'params'),
    asyncHandler(getColumnById)
  )
  .post(
    '/boards/:boardId/columns',
    validator(boardId, 'params'),
    validator(column, 'body'),
    asyncHandler(creatColumn)
  )
  .delete(
    '/boards/:boardId/columns/:columnId',
    validator(columnId, 'params'),
    asyncHandler(deleteColumn)
  )
  .put(
    '/boards/:boardId/columns/:columnId',
    validator(columnId, 'params'),
    validator(column, 'body'),
    asyncHandler(updateColumn)
  );

export default router;
