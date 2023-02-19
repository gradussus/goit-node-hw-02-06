const contactValidation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: "Validation error" });
    }
    next();
  };
};

const favoriteContactValidation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(404).json({ message: "Missing field favorite" });
    }
    next();
  };
};

module.exports = { contactValidation, favoriteContactValidation };
