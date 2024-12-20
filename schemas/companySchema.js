import Joi from "joi";

export const companySchema = {
  POST: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    logo: Joi.string().optional(),
  }),
  PUT: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    logo: Joi.string().optional(),
  }),
};
