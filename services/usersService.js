// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { User } = require("../schemas/userModel");

const signupUserService = async (email, password) => {
  // if (await User.findOne({ email })) {
  //   res.err
  // }

  const user = new User({
    email,
    password,
  });

  await user.save();
  return user;
};

module.exports = { signupUserService };
