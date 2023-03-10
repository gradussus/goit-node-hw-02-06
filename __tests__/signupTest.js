// const { signupUser } = require("../models/users");
// const { loginUser } = require("../models/users");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const { User } = require("../schemas/userModel");

// describe("login test", () => {
//   it("login", () => {
//     const mUser = {
//       email: "asd@gmail.com",
//       password: "asdasdasd123",
//       _id: "123123123",
//       subscription: "starter",
//       token: "2132234",
//     };

//     const mReq = {
//       body: {
//         email: "test123@gmail.com",
//         password: "test1234",
//       },
//     };

//     jest.spyOn(User, "findOne").mockImplementationOnce(() => mUser);
//     jest.spyOn(User, "findByIdAndUpdate").mockImplementationOnce(() => mUser);
//     const mRes = {};

//     loginUser(mReq, mRes);

//     expect(typeof mRes.user.email).toBe("string");
//     expect(typeof mRes.user.subscription).toBe("string");
//     expect(mRes.user.email).toEqual(user.email);
//     expect(mRes.user.subscription).toEqual("starter");
//   });
// });

// describe("Signup test", () => {
//   it("asd", () => {
//     const user = {
//       email: "asd@gmail.com",
//       password: "asdasdasd123",
//     };

//     const mReq = {
//       body: {
//         email: "test123@gmail.com",
//         password: "test1234",
//       },
//     };

//     jest.spyOn(User, "save").mockImplementationOnce(() => user);

//     const mRes = {};

//     signupUser(mReq, mRes);

//     expect(typeof mRes.user.email).toBe("string");
//     expect(typeof mRes.user.subscription).toBe("string");
//     expect(mRes.user.email).toEqual(user.email);
//     expect(mRes.user.subscription).toEqual("starter");
//   });
// });
