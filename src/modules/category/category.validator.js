/** import express validator body method */
const { body, param } = require("express-validator");
/** import message */
const { CategoryMessage } = require("./category.message");
/** import mongoose module */
const { default: mongoose } = require("mongoose");

/**
 * new category validator
 * @returns {ValidationChain[]}
 */
function NewCategoryValidator() {
	return [
		body("name")
			.notEmpty()
			.withMessage(CategoryMessage.RequiredName)
			.trim()
			.escape(),
		body("icon")
			.notEmpty()
			.withMessage(CategoryMessage.RequiredIcon)
			.trim()
			.escape(),
		body("slug").optional().trim().escape(),
		body("parent").custom(async (parent) => {
			if (!parent || typeof parent === "undefined" || parent.trim() === "") {
				return true;
			}

			if (!mongoose.Types.ObjectId.isValid(parent)) {
				throw CategoryMessage.InvalidParent;
			}

			return true;
		}),
	];
}

/**
 * category removal validator
 * @returns {ValidationChain[]}
 */
function RemoveCategoryValidator() {
	return [
		param("id").isMongoId().withMessage(CategoryMessage.InvalidCategoryId),
	];
}

module.exports = {
	NewCategoryValidator,
	RemoveCategoryValidator,
};
