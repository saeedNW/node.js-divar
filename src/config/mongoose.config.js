/** import mongoose */
const { default: mongoose } = require("mongoose");

/** initialize mongodb connection using mongoose */
mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("connected to mongodb");
	})
	.catch((err) => {
		console.log(err?.message ?? "failed connect to mongodb");
	});
