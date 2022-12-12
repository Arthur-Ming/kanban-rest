import express from 'express';
import boardRoutes from './resources/boards/board.routes.js';
import columnRoutes from './resources/columns/column.routes.js';
import taskRoutes from './resources/tasks/task.routes.js';

import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from './errors/errorHandler.js';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { NotFoundError } from './errors/appErrors.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(boardRoutes);
app.use(columnRoutes);
app.use(taskRoutes);

app.use((_req, _res, _next) => {
  throw new NotFoundError(null, null, getReasonPhrase(StatusCodes.NOT_FOUND));
});

app.use(errorHandler);

export default app;
