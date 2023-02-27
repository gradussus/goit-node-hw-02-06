const jwt = require("jsonwebtoken");

const { UnauthorizedError } = require("../helpers/errors");
const { User } = require("../schemas/userModel");

const authMiddleware = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    next(new UnauthorizedError("We need token"));
    return;
  }
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token) {
    next(new UnauthorizedError("We need token"));
    return;
  }
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(id);

  if (!user || token !== user.token) {
    next(new UnauthorizedError("Not authorized"));
    return;
  }

  req.user = user;

  next();
};

module.exports = {
  authMiddleware,
};
