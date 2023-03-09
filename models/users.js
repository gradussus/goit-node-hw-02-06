const {
  signupUserService,
  loginUserService,
  logoutUserService,
  updateUserService,
  updateAvatarService,
  verificationUserService,
  reVerifictaionUserService,
} = require("../services/usersService");
require("dotenv").config();

const { User } = require("../schemas/userModel");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

const updateAvatar = async (req, res) => {
  const { filename } = req.file;
  const { _id } = req.user;
  const { avatarURL } = await updateAvatarService(_id, filename);
  res.status(200).json({ avatarURL });
};

const verifictaionUser = async (req, res) => {
  const { verificationToken } = req.params;

  await verificationUserService(verificationToken);
  res.status(200).json({ message: "Verification successful" });
};

const reVerifictaionUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "missing required field email" });
  }

  await reVerifictaionUserService(email);
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser,
  updateAvatar,
  verifictaionUser,
  reVerifictaionUser,
};
