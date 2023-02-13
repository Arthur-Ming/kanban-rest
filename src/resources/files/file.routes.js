import Router from 'koa-router';
import multer from '@koa/multer';
import schemas from '../../utils/validation/schemas.js';
import { fileUpload, fileDelete } from './file.controllers.js';

import { nanoid } from 'nanoid';
import mime from 'mime-types';

const { columnId, taskId, task } = schemas;
const filesRouter = Router({ prefix: '/tasks/:taskId/files' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const id = nanoid();
    const ext = mime.extension(file.mimetype);
    cb(null, `${id}.${ext}`);
  },
});

const upload = multer({ storage });

filesRouter.post('/', upload.single('image'), fileUpload).delete('/:fileId', fileDelete);

export default filesRouter;
