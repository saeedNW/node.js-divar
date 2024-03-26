/** import express */
const express = require("express");
/** import dotenv */
const dotenv = require("dotenv");
/** config project's env file */
dotenv.config({
	path: process.cwd() + `/env/.env.${process.env.NODE_ENV}`,
});
/** import swagger configs */
const { SwaggerConfig } = require("./src/config/swagger.config");
/** import main router */
const { MainRouter } = require("./src/app.routes");
/** import notfound exception handler */
const { NotFoundHandler } = require("./src/common/exceptions/notfound.handler");
/** import errors exception handler */
const { ErrorsHandler } = require("./src/common/exceptions/error.handler");
/** import cookie parser */
const cookieParser = require("cookie-parser");

async function main() {
	/** create an app instants from express */
	const app = express();

	/**
	 * define server port
	 * @type {number|number}
	 */
	const PORT = parseInt(process.env.PORT, 10) || 3000;

	/** import mongodb connection config */
	require("./src/config/mongoose.config");

	/** initialize express json body parser */
	app.use(express.json());
	/** initialize express urlencoded body parser */
	app.use(express.urlencoded({ extended: true }));
	/** initialize cookieParser module */
	app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

	/** initialize swagger */
	SwaggerConfig(app);

	/** initialize application routers */
	app.use(MainRouter);
	/** initialize notfound exception handler */
	NotFoundHandler(app);
	/** initialize errors exception handler */
	ErrorsHandler(app);

	app.listen(PORT, () => {
		console.log(`Server: http://localhost:${PORT}`);
	});
}

main();
