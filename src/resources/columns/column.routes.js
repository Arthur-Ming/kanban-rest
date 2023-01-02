import Router from 'koa-router';
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
const columnsRouter = Router({ prefix: '/boards/:boardId/columns' });

columnsRouter
  .get('/', validator(boardId, 'params'), getAllColumns)
  .get('/:columnId', validator(columnId, 'params'), getColumnById)
  .post('/', validator(boardId, 'params'), validator(column, 'body'), creatColumn)
  .delete('/:columnId', validator(columnId, 'params'), deleteColumn)
  .put('/:columnId', validator(columnId, 'params'), validator(column, 'body'), updateColumn);

export default columnsRouter;
