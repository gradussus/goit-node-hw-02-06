const emailValidation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: "Validation error" });
    }
    next();
  };
};

module.exports = { emailValidation };
