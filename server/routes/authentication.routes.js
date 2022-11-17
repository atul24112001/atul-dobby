const express = require("express");
const authRouter = express.Router();
const { Login, Singup } = require("../controller/authentication");

authRouter.post("/singup", Singup)

authRouter.post("/login", Login)


module.exports = authRouter