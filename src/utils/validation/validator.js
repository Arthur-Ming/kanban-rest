import { BadRequestError, UnprocessableEntityError } from '../../errors/appErrors.js';

const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

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
