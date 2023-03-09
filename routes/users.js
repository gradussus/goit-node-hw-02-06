const express = require("express");

const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser,
  updateAvatar,
  verifictaionUser,
  reVerifictaionUser,
} = require("../models/users");

const { loginValidation } = require("../middlevares/loginValidation");
const { authMiddleware } = require("../middlevares/authMiddlevare");
const {
  uploadAvatarMiddlevare,
} = require("../middlevares/uploadAvatarMiddlevare");

const { loginValidationSchema } = require("../schemas/validationJoi");

const router = express.Router();

router.post(
  "/signup",
  loginValidation(loginValidationSchema),
  asyncWrapper(signupUser)
);

router.post(
  "/login",
  loginValidation(loginValidationSchema),
  asyncWrapper(loginUser)
);

router.get("/logout", authMiddleware, asyncWrapper(logoutUser));

router.get("/current", authMiddleware, asyncWrapper(currentUser));

router.patch("/", authMiddleware, asyncWrapper(updateUser));

router.patch(
  "/avatars",
  authMiddleware,
  uploadAvatarMiddlevare.single("avatar"),
  asyncWrapper(updateAvatar)
);

router.get("/verify/:verificationToken", asyncWrapper(verifictaionUser));

router.post("/verify", asyncWrapper(reVerifictaionUser));

module.exports = router;
