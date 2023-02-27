const {
  signupUserService,
  loginUserService,
  logoutUserService,
  updateUserService,
} = require("../services/usersService");

const { NotFoundError } = require("../helpers/errors");

const signupUser = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;
  const user = await signupUserService(email, password, subscription);
  res.status(201).json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);
  res.json(user);
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await logoutUserService(_id);
  req.user = null;
  res.status(204).send();
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
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
