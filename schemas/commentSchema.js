import Joi from "joi";

export const commentSchema = {
  POST: Joi.object({
    parent: Joi.string().min(2).max(30).required(),
    parentId: Joi.number().required(),
    ownerId: Joi.number().required(),
    text: Joi.string().required(),
  }),
  PUT: Joi.object({
    parent: Joi.string().min(2).max(30).required(),
    parentId: Joi.number().required(),
    ownerId: Joi.number().required(),
    text: Joi.string().required(),
  }),
};
