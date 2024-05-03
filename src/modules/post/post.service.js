/**
 * posts management class service
 * @module PostService
 */

/** import auto bind */
const autoBind = require("auto-bind");
/** import mongoose methods */
const { isValidObjectId, Types: mongooseTypes } = require("mongoose");
/** import http error */
const createHttpError = require("http-errors");
/** import post model */
const { PostModel } = require("./post.model");
/** import option model */
const { OptionModel } = require("../option/option.model");
/** import post message */
const { PostMessage } = require("./post.message");
/** import category model */
const { CategoryModel } = require("../category/category.model");
/** import utility functions */
const { copyObject } = require("../../common/utils/functions");

class PostService {
	/**
	 * posts model private variable
	 * @private
	 */
	#model;
	/**
	 * option model private variable
	 * @private
	 */
	#optionModel;
	/**
	 * category model private variable
	 * @private
	 */
	#categoryModel;

	/** post class service constructor */
	constructor() {
		/** initialize auto bind */
		autoBind(this);
		/**
		 * set private model variable's value
		 * @private
		 */
		this.#model = PostModel;
		/**
		 * set private option model variable's value
		 * @private
		 */
		this.#optionModel = OptionModel;
		/**
		 * set private category model variable's value
		 * @private
		 */
		this.#categoryModel = CategoryModel;
	}

	/**
	 * retrieve category's options data
	 * @param {string} categoryId - category object id
	 * @returns {object|null} - return options data or null as result
	 */
	async getCategoryOptions(categoryId) {
		/** retrieve options data from database by category id */
		const options = await this.#optionModel.find({ category: categoryId });
		/** return options data if exists or null if not */
		return options.length > 0 ? copyObject(options) : null;
	}

	/**
	 * create new post entry in database
	 * @param {object} dto - new post's data object
	 * @returns {object} - newly created posts data
	 */
	async create(dto) {
		/** create new entry in database */
		return await this.#model.create(dto);
	}

	/**
	 * retrieve user's posts list
	 * @param {]string|object} userId - user object id
	 * @returns {object} - return user's posts list
	 */
	async find(userId) {
		/** retrieve user posts by user's object id */
		if (userId && isValidObjectId(userId)) {
			return copyObject(await this.#model.find({ userId }));
		}
		/** throw error if user id was invalid */
		throw new createHttpError.BadRequest(PostMessage.RequestNotValid);
	}

	/**
	 * retrieve posts data list based on provided data
	 * @param {object} options - search query data object
	 * @returns {[*]} - return posts list
	 */
	async findAll(options) {
		/** extract category and search data from options */
		let { category, search } = options;
		/** define query object */
		const query = {};
		/** proceed if category data was provided */
		if (category) {
			/** retrieve category data based on provided slug value */
			const result = copyObject(
				await this.#categoryModel.findOne({ slug: category })
			);
			/** retrieve the chosen category's child categories */
			let categories = copyObject(
				await this.#categoryModel.find(
					{ parents: new mongooseTypes.ObjectId(result._id) },
					{ _id: 1 }
				)
			);
			/** extract founded child categories object id from retrieved data */
			categories = categories.map((item) => item._id);

			/** set the query object data based on the retrieved data */
			if (result) {
				query["category"] = {
					$in: [result._id, ...categories],
				};
			} else {
				return [];
			}
		}
		/** proceed if the search option was provided */
		if (search) {
			/** convert search value to regex */
			search = new RegExp(search, "ig");
			/** set query object data based on the provided value */
			query["$or"] = [{ title: search }, { description: search }];
		}
		/** retrieve posts data from database */
		const posts = await this.#model.find(query, {}, { sort: { _id: -1 } });
		/** return posts data */
		return copyObject(posts);
	}

	/**
	 * retrieve single post data
	 * @param {string|object} postId - post object id
	 * @returns {object} - return single posts data object
	 */
	async checkExist(postId) {
		/** throe error if the post id was invalid */
		if (!postId || !isValidObjectId(postId)) {
			throw new createHttpError.BadRequest(PostMessage.RequestNotValid);
		}

		/** retrieve post's data from database */
		const [post] = await this.#model.aggregate([
			{ $match: { _id: new mongooseTypes.ObjectId(postId) } },
			{
				$lookup: {
					from: "users",
					localField: "userId",
					foreignField: "_id",
					as: "user",
				},
			},
			{
				$unwind: {
					path: "$user",
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$addFields: {
					userMobile: "$user.mobile",
				},
			},
			{
				$project: {
					user: 0,
				},
			},
		]);

		/** throw error if the post was not found */
		if (!post) throw new createHttpError.NotFound(PostMessage.NotFound);

		return copyObject(post);
	}

	/**
	 * post removal process service
	 * @param {string|object} postId - post object id
	 */
	async remove(postId) {
		/** check post existence */
		await this.checkExist(postId);
		/** remove the chosen post from database */
		await this.#model.deleteOne({ _id: new mongooseTypes.ObjectId(postId) });
	}
}

module.exports = new PostService();
