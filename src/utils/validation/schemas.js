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
  columnsOrder: Joi.object()
    .options({ allowUnknown: false })
    .keys({
      columnId: Joi.objectId().required(),
      source: Joi.object({
        index: Joi.number().min(0).required(),
      }).required(),
      destination: Joi.object({
        index: Joi.number().min(0).required(),
      }).required(),
    }),
  tasksOrder: Joi.object()
    .required()
    .options({ allowUnknown: false })
    .keys({
      taskId: Joi.objectId().required(),
      source: Joi.object({
        index: Joi.number().min(0).required(),
      }).required(),
      destination: Joi.object({
        index: Joi.number().min(0).required(),
        columnId: Joi.objectId().required(),
      }).required(),
    }),
};

export default schemas;
