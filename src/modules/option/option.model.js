/** import mongoose */
const { Schema, Types, model } = require("mongoose");

/** define option schema */
const OptionSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		key: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			enum: ["number", "string", "array", "boolean"],
		},
		enum: {
			type: Array,
			default: [],
		},
		guid: {
			type: String,
			required: false,
		},
		required: {
			type: Boolean,
			required: true,
			default: false,
		},
		category: {
			type: Types.ObjectId,
			ref: "category",
			required: true,
		},
	},
	{
		versionKey: false,
		id: false,
		timestamps: true,
	}
);

const OptionModel = model("option", OptionSchema);
module.exports = { OptionModel };
