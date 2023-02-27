const jwt = require("jsonwebtoken");

const { UnauthorizedError } = require("../helpers/errors");
const { User } = require("../schemas/userModel");

const authMiddleware = async (req, res, next) => {
  if (!req.headers["authorization"]) {
    next(new UnauthorizedError("We need Authorization header "));
    return;
  }

  try {
    const [tokenType, token] = req.headers["authorization"].split(" ");

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(_id);

    if (!user || token !== user.token) {
      next(new UnauthorizedError("Not authorized"));
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authMiddleware,
};
