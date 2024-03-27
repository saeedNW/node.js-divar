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
/** import authorization guard */
const {
	AuthorizationGuard,
} = require("../../common/guard/authorization.guard");

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

/** logout router */
AuthRouter.get("/logout", AuthorizationGuard, AuthController.logout);

/** export router */
module.exports = {
	AuthRouter,
};
