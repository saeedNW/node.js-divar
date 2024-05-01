/** import express module */
const express = require("express");
/** create express Router instance */
const OptionRouter = express.Router();
/** import options controller */
const OptionController = require("./option.controller");
/** import validators */
const { NewOptionValidator } = require("./option.validator");
/** import string to array middleware */
const {
	stringToArray,
} = require("../../common/middlewares/string.to.array.middleware");
/** import express validator mapper */
const {
	ExpressValidatorMapper,
} = require("../../common/middlewares/express.validator.mapper");

/** new option creation route */
OptionRouter.post(
	"/new",
	stringToArray("enum"),
	NewOptionValidator(),
	ExpressValidatorMapper,
	OptionController.create
);
/** options list route */
OptionRouter.get("/list", OptionController.find);
/** find by category id route  */
OptionRouter.get("/by-category/:categoryId", OptionController.findByCategoryId);
/** find by category slug route  */
OptionRouter.get(
	"/by-category-slug/:slug",
	OptionController.findByCategorySlug
);
/** single option route  */
OptionRouter.get("/single/:id", OptionController.findById);
/** update options route */
OptionRouter.put("/update/:id", OptionController.update);
/** remove option route */
OptionRouter.delete("/remove/:id", OptionController.removeById);

module.exports = {
	OptionRouter,
};
