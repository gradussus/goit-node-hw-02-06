const {
  signupUserService,
  loginUserService,
  logoutUserService,
  currentUserService,
} = require("../services/usersService");

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await signupUserService(email, password);
  res.status(201).json({ email: user.email, subscription: user.subscription });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);
  res.status(200).json({
    token: user.token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await logoutUserService(_id);
  res.status(204).send();
};

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await currentUserService(_id);

  res.status(200).json({ user });
};

module.exports = { signupUser, loginUser, logoutUser, currentUser };
