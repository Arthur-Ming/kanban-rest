import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {
        error: {
          status: err.status,
          message: err.message,
        },
      };
    } else {
      ctx.status = StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = {
        error: {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
        },
      };
    }
  }
};

export default errorHandler;
