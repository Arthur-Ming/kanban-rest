import { Router } from 'express';
import validator from '../../utils/validation/validator.js';
import { getAllTasks, creatTask, getTaskById, deleteTask, updateTask } from './task.controllers.js';
import schemas from '../../utils/validation/schemas.js';

const { boardId, columnId, taskId, task } = schemas;
const router = Router();

router
  .get('/boards/:boardId/columns/:columnId/tasks', validator(columnId, 'params'), getAllTasks)
  .get('/boards/:boardId/columns/:columnId/tasks/:taskId', validator(taskId, 'params'), getTaskById)
  .post(
    '/boards/:boardId/columns/:columnId/tasks',
    validator(columnId, 'params'),
    validator(task, 'body'),
    creatTask
  )
  .delete(
    '/boards/:boardId/columns/:columnId/tasks/:taskId',
    validator(taskId, 'params'),
    deleteTask
  )
  .put(
    '/boards/:boardId/columns/:columnId/tasks/:taskId',
    validator(taskId, 'params'),
    validator(task, 'body'),
    updateTask
  );

export default router;
