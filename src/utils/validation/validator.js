import { BadRequestError, UnprocessableEntityError } from '../../errors/appErrors.js';

const validator = (schema, property) => {
  return (ctx, next) => {
    const { error } =
      property === 'body' ? schema.validate(ctx.request[property]) : schema.validate(ctx[property]);

    if (error) {
      const errorMessage = error.details[0].message;
      throw property === 'body'
        ? new UnprocessableEntityError(errorMessage)
        : new BadRequestError(errorMessage);
    }

    return next();
  };
};

export default validator;
