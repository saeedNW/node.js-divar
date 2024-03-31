/** import express module */
const express = require("express");
/** create express Router instance */
const MainRouter = express.Router();

/** import and initialize auth router */
const { AuthRouter } = require("./modules/auth/auth.router");
MainRouter.use("/auth", AuthRouter);

/** import and initialize user router */
const { UserRouter } = require("./modules/user/user.router");
MainRouter.use("/user", UserRouter);

/** import and initialize category router */
const { CategoryRouter } = require("./modules/category/category.router");
MainRouter.use("/category", CategoryRouter);

/** export router */
module.exports = {
	MainRouter,
};
