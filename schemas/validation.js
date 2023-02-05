const Joi = require("joi");

const newContactValidatoin = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

const updateContactValidation = Joi.object({
  name: Joi.string().min(1).max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.number().optional(),
});
module.exports = { newContactValidatoin, updateContactValidation };
