import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import path from 'node:path';
import bodyParser from 'koa-bodyparser';
import boardsRouter from './resources/boards/board.routes.js';
import columnsRouter from './resources/columns/column.routes.js';
import tasksRouter from './resources/tasks/task.routes.js';
import usersRouter from './resources/users/user.routes.js';
import errorHandler from './errors/errorHandler.js';
import filesRouter from './resources/files/file.routes.js';
import cors from '@koa/cors';
import * as url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();

app.use(mount('/uploads', serve(path.join(__dirname, '../uploads'))));

app.use(cors());

app.use(errorHandler);

app.use(bodyParser());

app.use(boardsRouter.routes());
app.use(columnsRouter.routes());
app.use(tasksRouter.routes());
app.use(usersRouter.routes());
app.use(filesRouter.routes());

export default app;
