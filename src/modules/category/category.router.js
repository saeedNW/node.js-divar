/** import express module */
const express = require("express");
/** create express Router instance */
const CategoryRouter = express.Router();
/** import category controller */
const CategoryController = require("./category.controller");
/** import category validators */
const {
	NewCategoryValidator,
	RemoveCategoryValidator,
} = require("./category.validator");
/** import express validator mapper middleware */
const {
	ExpressValidatorMapper,
} = require("../../common/middlewares/express.validator.mapper");

/** mew category route */
CategoryRouter.post(
	"/new",
	NewCategoryValidator(),
	ExpressValidatorMapper,
	CategoryController.create
);

/** remove category route */
CategoryRouter.delete(
	"/remove/:id",
	RemoveCategoryValidator(),
	ExpressValidatorMapper,
	CategoryController.remove
);

/** CATEGORY LIST ROUTE */
CategoryRouter.get("/list", CategoryController.find);

module.exports = {
	CategoryRouter: CategoryRouter,
};
