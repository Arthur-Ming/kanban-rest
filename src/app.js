import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import boardsRouter from './resources/boards/board.routes.js';
import columnsRouter from './resources/columns/column.routes.js';
import tasksRouter from './resources/tasks/task.routes.js';
import errorHandler from './errors/errorHandler.js';

const app = new Koa();

app.use(errorHandler);

app.use(bodyParser());

app.use(boardsRouter.routes());
app.use(columnsRouter.routes());
app.use(tasksRouter.routes());

export default app;
