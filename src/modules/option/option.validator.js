/** import express validator body method */
const { body, param } = require("express-validator");
/** import message */
const { OptionMessage } = require("./option.message");

/**
 * new option validator
 * @returns {ValidationChain[]}
 */
function NewOptionValidator() {
	return [
		body("title")
			.notEmpty()
			.withMessage(OptionMessage.RequiredTitle)
			.trim()
			.escape(),
		body("key")
			.notEmpty()
			.withMessage(OptionMessage.RequiredKey)
			.trim()
			.escape(),
		body("category")
			.notEmpty()
			.withMessage(OptionMessage.RequiredCategory)
			.isMongoId()
			.withMessage(OptionMessage.InvalidCategory),
		body("type")
			.notEmpty()
			.withMessage(OptionMessage.RequiredType)
			.isIn(["number", "string", "boolean", "array"])
			.withMessage(OptionMessage.InvalidType)
			.trim()
			.escape(),
		body("guid")
			.if(body("guid").notEmpty())
			.isString()
			.withMessage(OptionMessage.InvalidGuidType)
			.trim()
			.escape(),
		body("required")
			.if(body("required").notEmpty())
			.isIn(["true", true, "false", false])
			.withMessage(OptionMessage.InvalidRequired)
			.trim()
			.escape(),
		body("enum")
			.if(body("enum").notEmpty())
			.isArray({ min: 0 })
			.withMessage(OptionMessage.InvalidRequired),
	];
}

module.exports = {
	NewOptionValidator,
};
