/** import mongoose */
const { Schema, Types, model } = require("mongoose");

/** define category schema */
const CategorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			index: true,
		},
		icon: {
			type: String,
			required: true,
		},
		parent: {
			type: Types.ObjectId,
			ref: "category",
			required: false,
		},
		parents: {
			type: [Types.ObjectId],
			required: false,
			default: [],
		},
	},
	{
		versionKey: false,
		id: false,
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

/** define categories' children virtual */
CategorySchema.virtual("children", {
	ref: "category",
	localField: "_id",
	foreignField: "parent",
});

/**
 * auto populate function
 * @param next
 */
function autoPopulate(next) {
	this.populate([{ path: "children", select: { __v: 0 } }]);
	next();
}

/** define schema pre find and findOne method */
CategorySchema.pre("findOne", autoPopulate).pre("find", autoPopulate);

const CategoryModel = model("category", CategorySchema);
module.exports = { CategoryModel };
