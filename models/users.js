const {
  signupUserService,
  loginUserService,
  logoutUserService,
  currentUserService,
  updateUserService,
} = require("../services/usersService");

const { NotFoundError } = require("../helpers/errors");

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
  req.user = null;
  res.status(204).send();
};

const currentUser = async (req, res) => {
  const { _id } = req.user;
  const user = await currentUserService(_id);

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await updateUserService(_id, subscription);

  if (!user) {
    throw new NotFoundError("Not found");
  }
  res.status(200).json({ email: user.email, subscription: user.subscription });
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser,
};
