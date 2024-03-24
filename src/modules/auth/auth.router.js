/** import express module */
const express = require("express");
/** create express Router instance */
const authRouter = express.Router();
/** import auth controller */
const AuthController = require("./auth.controller");
/** import authentication validator */
const { sendOTPValidator } = require("./auth.validator");
/** import express validator mapper */
const { expressValidatorMapper } = require("../../common/middlewares/express.validator.mapper");

/** send otp code router */
authRouter.post("/send-otp", sendOTPValidator(), expressValidatorMapper, AuthController.sendOTP);
/** check otp code router */
authRouter.post("/check-otp", AuthController.checkOTP);

/** export router */
module.exports = {
	authRouter,
};
