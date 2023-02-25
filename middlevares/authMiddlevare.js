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
  if (!jwt.decode(token, process.env.JWT_SECRET)) {
    next(new UnauthorizedError("Wrong token"));
    return;
  }
  const { _id } = jwt.decode(token, process.env.JWT_SECRET);
  const user = await User.findById(_id);

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
