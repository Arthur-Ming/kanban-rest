import { upload } from './file.service.js';

export const fileUpload = async (ctx) => {
  const { taskId } = ctx.params;

  ctx.body = await upload(taskId, {
    filename: ctx.file.filename,
    extension: ctx.file.originalname.split('.').pop(),
  });
};
