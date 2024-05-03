/** import mongoose */
const { Schema, Types, model } = require("mongoose");

/** define post schema */
const PostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		userId: {
			type: Types.ObjectId,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
			default: 0,
		},
		content: {
			type: String,
			required: true,
		},
		category: {
			type: Types.ObjectId,
			ref: "category",
			required: true,
		},
		province: {
			type: String,
			required: false,
		},
		city: {
			type: String,
			required: false,
		},
		district: {
			type: String,
			required: false,
		},
		address: {
			type: String,
			required: false,
		},
		coordinate: {
			//? 51.215485487, 52.687524154
			type: [Number],
			required: true,
		},
		images: {
			type: [String],
			required: false,
			default: [],
		},
		options: {
			type: Object,
			default: {},
		},
	},
	{
		versionKey: false,
		id: false,
		timestamps: true,
	}
);

const PostModel = model("post", PostSchema);
module.exports = { PostModel };
