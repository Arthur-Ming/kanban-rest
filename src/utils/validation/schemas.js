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
};

export default schemas;
