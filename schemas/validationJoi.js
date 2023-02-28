const Joi = require("joi");

const newContactValidation = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean().optional(),
});

const updateContactValidation = Joi.object({
  name: Joi.string().min(1).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.number().optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const updateFavoriteValidation = Joi.object({
  favorite: Joi.boolean().required(),
});

const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).alphanum().required(),
});
module.exports = {
  newContactValidation,
  updateContactValidation,
  updateFavoriteValidation,
  loginValidationSchema,
};
