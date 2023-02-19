const express = require("express");

const { asyncWrapper } = require("../helpers/apiHelpers");

const { signupUser } = require("../models/users");

const { loginValidation } = require("../middlevares/loginValidation");
const { loginValidationSchema } = require("../schemas/validationJoi");

const router = express.Router();

router.post(
  "/signup",
  loginValidation(loginValidationSchema),
  asyncWrapper(signupUser)
);

module.exports = router;
