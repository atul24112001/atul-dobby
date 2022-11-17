const express = require("express");
const imageRouter = express.Router();
const userVerification = require("../middleware/userVerification");
const { GetImages, UploadImage } = require("../controller/images");

imageRouter.get("/:userId", userVerification, GetImages)

imageRouter.post("/", userVerification, UploadImage)


module.exports = imageRouter