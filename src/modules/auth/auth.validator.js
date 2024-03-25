/** import express validator body method */
const { body } = require("express-validator");
/** import helper functions */
const { fixNumbers } = require("../../common/utils/functions");
/** import regex constants */
const { PhoneRegEx } = require("../../common/constant/regex.enum");
/** import authentication message */
const { AuthMessage } = require("./auth.messages");

/**
 * get opt process validator
 * @returns {ValidationChain[]}
 */
function sendOTPValidator() {
	return [
		/**
		 * user's mobile number validator
		 */
		body("mobile")
			/**
			 * create a custom validator to make sure that it's a valid mobile number.
			 */
			.custom(async (mobile) => {
				/**
				 * fix mobile's persian or arabic number.
				 * @type {string|number}
				 */
				mobile = fixNumbers(mobile);

				/** throw error if date format is invalid */
				if (!PhoneRegEx.test(mobile)) throw AuthMessage.InvalidMobileNumber;

				return true;
			}),
	];
}

/**
 * check opt code validator
 * @returns {ValidationChain[]}
 */
function checkOptValidator() {
	return [
		/**
		 * user's mobile number validator
		 */
		body("mobile")
			/**
			 * create a custom validator to make sure that it's a valid mobile number.
			 */
			.custom((mobile) => {
				/**
				 * fix mobile's persian or arabic number.
				 * @type {string|number}
				 */
				mobile = fixNumbers(mobile);

				/** throw error if date format is invalid */
				if (!PhoneRegEx.test(mobile)) throw AuthMessage.InvalidMobileNumber;

				return true;
			}),
		/**
		 * opt code validator
		 */
		body("code")
			.isLength({ min: 5, max: 5 })
			.withMessage(AuthMessage.InvalidOTPCode),
	];
}

module.exports = {
	sendOTPValidator,
	checkOptValidator,
};
