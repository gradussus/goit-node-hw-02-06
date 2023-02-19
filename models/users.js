const { signupUserService } = require("../services/usersService");

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await signupUserService(email, password);
  // res.status(201).json({ email: user.email, subscription: user.subscription });
  res.status(201).json({ email: "asdsa" });
};

exports.module = { signupUser };
