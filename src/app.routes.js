/** import express module */
const express = require("express");
/** create express Router instance */
const MainRouter = express.Router();

/** import and initialize auth router */
const { AuthRouter } = require("./modules/auth/auth.router");
MainRouter.use("/auth", AuthRouter);

/** export router */
module.exports = {
	MainRouter,
};
