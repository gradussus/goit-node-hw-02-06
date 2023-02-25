const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../schemas/userModel");
const { ConflictError, UnauthorizedError } = require("../helpers/errors");

const signupUserService = async (email, password) => {
  if (await User.findOne({ email })) {
    throw new ConflictError("Email in use");
  }

  const user = new User({
    email,
    password,
  });

  await user.save();
  return user;
};

const loginUserService = async (email, password) => {
  console.log(email, password);
  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError("Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  const loginUser = await User.findByIdAndUpdate(
    user._id,
    { $set: { token } },
    { new: true }
  );

  return loginUser;
};

const logoutUserService = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
  return;
};

const currentUserService = async (id) => {
  const user = await User.findById(id).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });
  return user;
};

module.exports = {
  signupUserService,
  loginUserService,
  logoutUserService,
  currentUserService,
};
