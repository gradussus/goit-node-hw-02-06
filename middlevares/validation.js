const validation = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ massage: "Validation error" });
    }
    next();
  };
};

module.exports = { validation };
