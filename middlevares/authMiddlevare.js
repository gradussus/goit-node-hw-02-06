const jwt = require("jsonwebtoken");

const { User } = require("../schemas/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const [tokenType, token] = req.headers["authorization"].split(" ");

    if (!token) {
      next(new Error("we need token"));
    }
    const { _id } = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);

    if (!user || token !== user.token) {
      throw new Error("Not authorized");
    }

    req.user = user;

    next();
  } catch (err) {
    next(new Error("kaskjasf"));
  }
};

module.exports = {
  authMiddleware,
};
