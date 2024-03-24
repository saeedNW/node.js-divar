/** import express validator validationResult method */
const { validationResult } = require("express-validator");

/**
 * middleware function to map Express Validator validation results to a standard error format.
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @param {Function} next - The next middleware function
 */
function expressValidatorMapper(req, res, next) {
	/**
	 * Object to store the validation errors.
	 * @type {Object}
	 */
	const errors = {};

	/**
	 * Validation results from the Express Validator.
	 * @type {Object}
	 */
	const validation = validationResult(req);

	/** Check if there are any validation errors */
	if (validation?.errors?.length > 0) {
		/**
		 * Loop through the validation errors
		 * and map them to the error object
		 */
		for (const err of validation?.errors) {
			errors[err.path] = err.msg;
		}

		/**
		 * Return the error messages as a JSON
		 * response with status code 422
		 */
		return res.status(422).json({
			status: 422,
			success: false,
			message: "Validation error",
			errors,
		});
	}

	/** If there are no validation errors, call the next middleware function */
	next();
}

module.exports = { expressValidatorMapper };
