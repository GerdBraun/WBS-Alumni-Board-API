import Joi from "joi";

export const questionSchema = {
  POST: Joi.object({
    text: Joi.string().min(2).max(30).required(),
    ownerId: Joi.number().required(),
  }),
  PUT: Joi.object({
    text: Joi.string().min(2).max(30).required(),
    ownerId: Joi.number().required(),
  }),
};
