/** import express module */
const express = require("express");
/** create express Router instance */
const UserRouter = express.Router();
/** import user controller */
const UserController = require("./user.controller");
/** import auth guard */
const { AuthorizationGuard } = require("../../common/guard/authorization.guard");

UserRouter.get("/profile", AuthorizationGuard, UserController.profile);

/** export router */
module.exports = {
	UserRouter,
};
