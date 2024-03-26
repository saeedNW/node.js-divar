/** import express module */
const express = require("express");
/** create express Router instance */
const AuthRouter = express.Router();
/** import auth controller */
const AuthController = require("./auth.controller");
/** import authentication validator */
const { SendOTPValidator, CheckOptValidator } = require("./auth.validator");
/** import express validator mapper */
const {
	ExpressValidatorMapper,
} = require("../../common/middlewares/express.validator.mapper");

/** send otp code router */
AuthRouter.post(
	"/send-otp",
	SendOTPValidator(),
	ExpressValidatorMapper,
	AuthController.sendOTP
);

/** check otp code router */
AuthRouter.post(
	"/check-otp",
	CheckOptValidator(),
	ExpressValidatorMapper,
	AuthController.checkOTP
);

/** export router */
module.exports = {
	AuthRouter,
};
