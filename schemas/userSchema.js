import Joi from "joi";

export const userSchema = {
  POST: Joi.object({
    firstName: Joi.string().min(2).max(30).optional(),
    lastName: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(50).required(),
    isActive: Joi.boolean().optional(),
    companyId: Joi.string().optional(),
    role: Joi.string().optional(),
    passwordResetToken: Joi.string().optional(),
    passwordResetTokenExpiry: Joi.date().optional(),
  }),
  PUT: Joi.object({
    firstName: Joi.string().min(2).max(30).optional(),
    lastName: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(8).max(50).optional(),
    isActive: Joi.boolean().optional(),
    companyId: Joi.string().optional(),
    role: Joi.string().optional(),
    passwordResetToken: Joi.string().optional(),
    passwordResetTokenExpiry: Joi.date().optional(),
    avatar: Joi.string().optional(),
}),
};
