import Joi from "joi";

export const questionSchema = {
  POST: Joi.object({
    title: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    ownerId: Joi.number().required(),
  }),
  PUT: Joi.object({
    title: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    ownerId: Joi.number().required(),
  }),
};
