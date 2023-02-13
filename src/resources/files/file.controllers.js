import { upload, remove } from './file.service.js';

export const fileUpload = async (ctx) => {
  const { taskId } = ctx.params;

  ctx.body = await upload(taskId, {
    filename: ctx.file.filename,
    extension: ctx.file.originalname.split('.').pop(),
  });
};

export const fileDelete = async (ctx) => {
  const { taskId, fileId } = ctx.params;
  ctx.body = await remove(taskId, fileId);
};
