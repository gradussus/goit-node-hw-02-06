const Joi = require("joi");

module.exports = {
  validation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(1).max(30),
      email: Joi.string().email(),
      phone: Joi.number(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ massage: "Validation error" });
    }
    next();
  },
};
