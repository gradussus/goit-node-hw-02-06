const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const { sendEmail } = require("../helpers/sendEmail");
const { User } = require("../schemas/userModel");
const {
  ConflictError,
  UnauthorizedError,
  Error400,
} = require("../helpers/errors");

const signupUserService = async (email, password, subscription) => {
  if (await User.findOne({ email })) {
    throw new ConflictError("Email is use");
  }

  const verificationToken = v4();

  const user = new User({
    email,
    password,
    subscription,
    avatarURL: gravatar.url(email),
    verificationToken,
  });

  await user.save();

  sendEmail(email, verificationToken);

  return { email, subscription };
};

const loginUserService = async (email, password) => {
  const user = await User.findOne({ email, verify: true });

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
  ).select({
    token: 1,
    email: 1,
    subscription: 1,
    _id: 0,
  });

  return loginUser;
};

const logoutUserService = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
  return;
};

const updateUserService = async (id, subscription) => {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: { subscription } },
    { new: true }
  ).select({
    email: 1,
    subscription: 1,
    _id: 0,
  });
  return user;
};

const updateAvatarService = async (id, filename) => {
  Jimp.read(path.resolve(`./tmp/${filename}`)).then((avatar) =>
    avatar.resize(250, 250).write(path.resolve(`./public/avatars/${filename}`))
  );

  const avatarURL = `/avatars/${filename}`;

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { avatarURL } },
    { new: true }
  ).select({
    avatarURL: 1,
    _id: 0,
  });
  return user;
};

const verificationUserService = async (verificationToken) => {
  const user = await User.findOneAndUpdate(
    { verificationToken },
    {
      $set: { verificationToken: null, verify: true },
    }
  );

  if (!user) {
    throw new Error400("Not found");
  }
  return user;
};

const reVerifictaionUserService = async (email) => {
  const user = await User.findOne({ email, verify: false });
  if (!user) {
    throw new Error400("Not found");
  }

  const { verificationToken } = user;

  sendEmail(email, verificationToken);
};

module.exports = {
  signupUserService,
  loginUserService,
  logoutUserService,
  updateUserService,
  updateAvatarService,
  verificationUserService,
  reVerifictaionUserService,
};
