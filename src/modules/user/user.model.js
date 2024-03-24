/** import mongoose */
const { Schema, model } = require("mongoose");

/** define a schema for OTP code */
const OTPSchema = new Schema({
	code: {
		type: String,
		required: false,
		default: undefined,
	},
	expiresIn: {
		type: Number,
		required: false,
		default: 0,
	},
});

/** define user schema */
const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: false,
		},
		mobile: {
			type: String,
			unique: true,
			required: true,
		},
		otp: {
			type: OTPSchema,
		},
		verifiedMobile: {
			type: Boolean,
			default: false,
			required: true,
		},
		accessToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = model("user", UserSchema);

module.exports = UserModel;
