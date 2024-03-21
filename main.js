/** import express */
const express = require('express');
/** import dotenv */
const dotenv = require("dotenv");
/** import path */
const path = require('path');
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

	app.listen(PORT, () => {
		console.log(`Server: http://localhost:${PORT}`);
	});
}

main()