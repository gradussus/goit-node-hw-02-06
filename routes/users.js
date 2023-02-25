const express = require("express");

const { asyncWrapper } = require("../helpers/apiHelpers");

const {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser,
} = require("../models/users");

const { loginValidation } = require("../middlevares/loginValidation");
const { authMiddleware } = require("../middlevares/authMiddlevare");
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

module.exports = router;
