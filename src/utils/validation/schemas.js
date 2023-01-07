import Joi from '@hapi/joi';
import joiObjectid from 'joi-objectid';
Joi.objectId = joiObjectid(Joi);

const schemas = {
  boardId: Joi.object({
    boardId: Joi.objectId(),
  }),
  columnId: Joi.object({
    boardId: Joi.objectId(),
    columnId: Joi.objectId(),
  }),
  taskId: Joi.object({
    boardId: Joi.objectId(),
    columnId: Joi.objectId(),
    taskId: Joi.objectId(),
  }),
  board: Joi.object()
    .options({ allowUnknown: false })
    .keys({
      title: Joi.string().max(50).required(),
      description: Joi.string().max(200).allow(null, ''),
    }),
  column: Joi.object()
    .options({ allowUnknown: false })
    .keys({
      title: Joi.string().max(50).required(),
    }),
  task: Joi.object()
    .options({ allowUnknown: false })
    .keys({
      title: Joi.string().max(50).required(),
      description: Joi.string().max(200).allow(null, ''),
    }),
  register: Joi.object()
    .options({ allowUnknown: false })
    .keys({
      name: Joi.string().min(3).max(60).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
    }),
  login: Joi.object()
    .options({ allowUnknown: false })
    .keys({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).required(),
    }),
};

export default schemas;
