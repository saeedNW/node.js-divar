/** import http-error module */
const createHttpError = require("http-errors");

/**
 * application's 404 exceptions handler
 * @param {object} app - express application instants
 */
function notFoundHandler(app) {
	app.use((req, res, next) => {
		next(new createHttpError.NotFound("The requested route was notfound"));
	});
}
module.exports = notFoundHandler;
