/** import express */
const express = require("express");
/** import dotenv */
const dotenv = require("dotenv");
/** import path */
const path = require("path");
/** import swagger configs */
const SwaggerConfig = require("./src/config/swagger.config");
/** config project's env file */
dotenv.config({
	path: path.resolve(`./env/.env.${process.env.NODE_ENV}`),
});

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

	/** initialize swagger */
	SwaggerConfig(app);

	app.listen(PORT, () => {
		console.log(`Server: http://localhost:${PORT}`);
	});
}

main();
