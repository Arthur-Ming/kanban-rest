import Router from 'koa-router';
import validator from '../../utils/validation/validator.js';
import { getAllTasks, creatTask, getTaskById, deleteTask, updateTask } from './task.controllers.js';
import schemas from '../../utils/validation/schemas.js';
import { checkAuthentication, mustBeAuthenticated } from '../../utils/authentication.js';

const { columnId, taskId, task } = schemas;
const tasksRouter = Router({ prefix: '/boards/:boardId/columns/:columnId/tasks' });

/* tasksRouter.use(checkAuthentication, mustBeAuthenticated); */

tasksRouter
  .get('/', validator(columnId, 'params'), getAllTasks)
  .get('/:taskId', validator(taskId, 'params'), getTaskById)
  .post('/', validator(columnId, 'params'), validator(task, 'body'), creatTask)
  .delete('/:taskId', validator(taskId, 'params'), deleteTask)
  .put('/:taskId', validator(taskId, 'params'), validator(task, 'body'), updateTask);

export default tasksRouter;
