import { Router } from 'express';
import validator from '../../utils/validation/validator.js';
import { getAllTasks, creatTask, getTaskById, deleteTask, updateTask } from './task.controllers.js';
import schemas from '../../utils/validation/schemas.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
const { columnId, taskId, task } = schemas;
const router = Router();

router
  .get(
    '/boards/:boardId/columns/:columnId/tasks',
    validator(columnId, 'params'),
    asyncHandler(getAllTasks)
  )
  .get(
    '/boards/:boardId/columns/:columnId/tasks/:taskId',
    validator(taskId, 'params'),
    asyncHandler(getTaskById)
  )
  .post(
    '/boards/:boardId/columns/:columnId/tasks',
    validator(columnId, 'params'),
    validator(task, 'body'),
    asyncHandler(creatTask)
  )
  .delete(
    '/boards/:boardId/columns/:columnId/tasks/:taskId',
    validator(taskId, 'params'),
    asyncHandler(deleteTask)
  )
  .put(
    '/boards/:boardId/columns/:columnId/tasks/:taskId',
    validator(taskId, 'params'),
    validator(task, 'body'),
    asyncHandler(updateTask)
  );

export default router;
