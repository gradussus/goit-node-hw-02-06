const validation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: "Validation error" });
    }
    next();
  };
};

const favoriteValidation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(404).json({ message: "Missing field favorite" });
    }
    next();
  };
};

module.exports = { validation, favoriteValidation };
