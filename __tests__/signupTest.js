const { signupUser } = require("../models/users");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

describe("Signup test", () => {
  it("asd", () => {
    const user = {
      email: "asd@gmail.com",
      password: "asdasdasd123",
    };

    const mReq = {
      body: {
        email: "test123@gmail.com",
        password: "test1234",
      },
    };

    const mRes = {};

    signupUser(mReq, mRes);

    expect(typeof mRes.user.email).toBe("string");
    expect(typeof mRes.user.subscription).toBe("string");
    expect(mRes.user.email).toEqual(user.email);
    expect(mRes.user.subscription).toEqual("starter");
  });
});
