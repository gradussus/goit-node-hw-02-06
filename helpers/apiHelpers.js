const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

module.exports = { asyncWrapper };

// res.status(500).json({ error: err.message });
