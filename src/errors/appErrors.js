import { StatusCodes } from 'http-status-codes';

class AppError extends Error {
  constructor(message) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(entity, params, message) {
    super(message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`);
    this.status = StatusCodes.NOT_FOUND;
  }
}

export class BadRequestError extends AppError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.BAD_REQUEST;
  }
}

export class EntityExistsError extends AppError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.EXPECTATION_FAILED;
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.UNPROCESSABLE_ENTITY;
  }
}
