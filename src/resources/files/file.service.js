import Task from '../tasks/task.model.js';
import File from './file.model.js';
import mongoose from 'mongoose';
import { NotFoundError } from '../../errors/appErrors.js';

export const upload = async (taskId, fileBody) => {
  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    throw new NotFoundError('task', { id: taskId });
  }

  const file = await File.create({
    taskId: mongoose.Types.ObjectId(taskId),
    ...fileBody,
  });

  await task.updateOne({ $push: { files: file } });

  return file;
};
