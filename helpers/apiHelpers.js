const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch((err) => asdf);
  };
};

module.exports = { asyncWrapper };

// res.status(500).json({ error: err.message });
