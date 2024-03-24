/** import http-error module */
const createHttpError = require("http-errors");

/**
 * application's error exceptions handler
 * @param {object} app - express application instants
 */
function errorsHandler(app) {
	app.use((err, req, res, next) => {
		/** define server internal error */
		const serverError = new createHttpError.InternalServerError();
		/** define error status */
		const status = err?.status || serverError.status;
		/** define error message */
		const message = err?.message || serverError.message;
		/** print error in console if the application runtime environment is development */
		if (process.env.NODE_ENV === "development") console.error(err);
		/** return error */
		return res.status(status).json({
			status,
			success: false,
			message,
		});
	});
}

module.exports = errorsHandler;
