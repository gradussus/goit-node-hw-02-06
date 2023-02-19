const loginValidation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res
        .status(400)
        .json({ message: `Validation error: ${result.error}` });
    }
    next();
  };
};

module.exports = { loginValidation };
