/** import express module */
const express = require("express");
/** create express Router instance */
const mainRouter = express.Router();

/** import and initialize auth router */
const { authRouter } = require("./modules/auth/auth.router");
mainRouter.use("/auth", authRouter);

/** export router */
module.exports = {
	mainRouter,
};
