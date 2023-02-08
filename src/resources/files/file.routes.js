import Router from 'koa-router';
import multer from '@koa/multer';
import validator from '../../utils/validation/validator.js';

import schemas from '../../utils/validation/schemas.js';
import { v4 as uuid } from 'uuid';
import { fileUpload } from './file.controllers.js';

const { columnId, taskId, task } = schemas;
const filesRouter = Router({ prefix: '/files/:taskId' });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  /* filename: function (req, file, cb) {
    const extension = file.originalname.split('.').pop();
    cb(null, `${uuid()}.${extension}`);
  }, */
});

const upload = multer({ storage: storage });

filesRouter.post('/upload', upload.single('image'), fileUpload);

export default filesRouter;
