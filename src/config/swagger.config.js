/** import swagger jsdoc */
const swaggerJsDoc = require("swagger-jsdoc");
/** import swagger ui */
const swaggerUi = require("swagger-ui-express");

/**
 * initialize swagger
 * @param {object} app - application instants created from express
 */
const SwaggerConfig = (app) => {
	/** define swagger doc config */
	const swaggerDocument = swaggerJsDoc({
		swaggerDefinition: {
			/** define swagger's open api version */
			openapi: "3.0.1",
			/** define the info shown in swagger page */
			info: {
				title: "Divar Application",
				description: "Divar Application's APIs document",
				version: "1.0.0",
			},
			/** set server url based on application runtime environment */
			servers: [
				{
					url: process.env.APPLICATION_DOMAIN,
				},
			],
		},
		/** set the rute of swagger docs */
		apis: [process.cwd() + "/src/modules/**/*.swagger.js"],
	});

	/** initialize swagger UI */
	const swagger = swaggerUi.setup(swaggerDocument, {});
	/** initialize swagger ui route */
	app.use("/api-doc", swaggerUi.serve, swagger);
};

module.exports = SwaggerConfig;
