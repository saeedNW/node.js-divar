/**
 * options management class service
 * @module OptionService
 */

/** import auto bind */
const autoBind = require("auto-bind");
/** import option model */
const { OptionModel } = require("../option/option.model");
/** import http-error module */
const createHttpError = require("http-errors");
/** import options message */
const { OptionMessage } = require("./option.message");
/** import slugify */
const { default: slugify } = require("slugify");
/** import category service */
const CategoryService = require("../category/category.service");
/** import mongoose */
const { default: mongoose } = require("mongoose");
/** import utility functions */
const {
	isTrue,
	isFalse,
	stringToArray,
	copyObject,
} = require("../../common/utils/functions");

class OptionService {
	/**
	 * options model private variable
	 * @private
	 */
	#model;
	/**
	 * category service private variable
	 * @private
	 */
	#categoryService;

	/** options class service constructor */
	constructor() {
		/** initialize auto bind */
		autoBind(this);
		/**
		 * set private model variable's value
		 * @private
		 */
		this.#model = OptionModel;
		/**
		 * set private category service variable's value
		 * @private
		 */
		this.#categoryService = CategoryService;
	}

	/**
	 * new option creation service
	 * @param {object} optionDto - new option data
	 * @returns {Promise<any>} - newly created option
	 */
	async create(optionDto) {
		/** check category existence */
		const category = await this.#categoryService.checkExistById(
			optionDto.category
		);

		/** convert option key value to a valid value */
		optionDto.key = slugify(optionDto.key, {
			trim: true, // trim the value
			replacement: "_", // replace spaces with replacement character "_"
			lower: true, // convert to lower case
		});

		/** check option existence */
		await this.alreadyExistByCategoryAndKey(optionDto.key, category._id);
		/** convert enum to an array */
		optionDto.enum = stringToArray(optionDto?.enum);
		/** set the required value */
		optionDto.required = isTrue(optionDto?.required) ? true : false;
		/** create the option in database */
		const option = await this.#model.create({ ...optionDto });

		/** throw error if creation was unsuccessful */
		if (!option) {
			throw new createHttpError.InternalServerError(OptionMessage.Failed);
		}

		/** return the newly created option */
		return option;
	}

	/**
	 * retrieve options data list populated with categories
	 * @returns {Promise<any>} - returns the options data
	 */
	async find() {
		/**
		 * retrieve options data from database.
		 * populate retrieved data with categories
		 */
		const options = await this.#model
			.find({}, { __v: 0 }, { sort: { _id: -1 } })
			.populate([{ path: "category", select: { name: 1, slug: 1 } }]);

		/** return the options data */
		return copyObject(options);
	}

	/**
	 *retrieve options data list by category id, populated with categories
	 * @param {object|string} category - Id of the category that options belongs to
	 * @returns {Promise<any>} - returns the options data
	 */
	async findByCategoryId(category) {
		/**
		 * retrieve options data from database by category id.
		 * populate retrieved data with categories
		 */
		const options = await this.#model
			.find({ category: new mongoose.Types.ObjectId(category) }, { __v: 0 })
			.populate([{ path: "category", select: { name: 1, slug: 1 } }]);

		/** return the options data */
		return copyObject(options);
	}

	/**
	 * retrieve options by category slug
	 * @param {string} slug - category's slug that has been requested for its options
	 * @returns {Promise<any>} - return options data object
	 */
	async findByCategorySlug(slug) {
		/**
		 * retrieve options data from database by category slug.
		 * populated with categories in order to extract category
		 * slug for search.
		 */
		const options = await this.#model.aggregate([
			{
				/** populate option with categories */
				$lookup: {
					from: "categories",
					localField: "category",
					foreignField: "_id",
					as: "category",
				},
			},
			{
				/** destructure category array */
				$unwind: {
					path: "$category",
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				/**
				 * create new fields and extract category
				 * data from category object
				 */
				$addFields: {
					categorySlug: "$category.slug",
					categoryName: "$category.name",
					categoryIcon: "$category.icon",
				},
			},
			{
				/** remove category object from retrieved data */
				$project: {
					category: 0,
					__v: 0,
				},
			},
			{
				/** use match option to filter data based on categories */
				$match: {
					categorySlug: slug,
				},
			},
		]);

		/** return the options data */
		return copyObject(options);
	}

	/**
	 * retrieve single option's data from database
	 * @param {object|string} id - option's object id
	 * @returns {Promise<any>} - return single option's data object
	 */
	async findById(id) {
		return await this.checkExistById(id);
	}

	/**
	 * option update process service
	 * @param {string|object} id - option's object id
	 * @param {object} optionDto - data that requested to be updated
	 * @returns {Promise<boolean>} - return true if the process was successful
	 */
	async update(id, optionDto) {
		/** check option existence */
		const existOption = await this.checkExistById(id);
		/** check category existence */
		await this.#categoryService.checkExistById(optionDto?.category);

		/** proceed with defining a key for the option if the slug value was defined */
		if (optionDto.slug) {
			/** convert option key value to a valid value */
			optionDto.key = slugify(optionDto.key, {
				trim: true, // trim the value
				replacement: "_", // replace spaces with replacement character "_"
				lower: true, // convert to lower case
			});

			/** extract category id from option dto or original option */
			let categoryId = optionDto?.category
				? optionDto.category
				: existOption.category;

			/** check option existence */
			await this.alreadyExistByCategoryAndKey(optionDto.key, categoryId, id);
		}

		/** convert enum to an array */
		optionDto.enum = stringToArray(optionDto?.enum);
		/** delete dto's enum if it's not an array or if it's an empty array */
		if (!Array.isArray(optionDto?.enum) || optionDto?.enum.length <= 0) {
			delete optionDto.enum;
		}

		/** set the required value */
		optionDto.required = isTrue(optionDto?.required)
			? true
			: isFalse(optionDto?.required)
			? false
			: delete optionDto?.required;

		/** update option's data */
		const updateResult = await this.#model.updateOne(
			{ _id: new mongoose.Types.ObjectId(id) },
			{ $set: { ...optionDto } }
		);

		/** throw error if update was unsuccessful */
		if (updateResult.modifiedCount <= 0) {
			throw new createHttpError.InternalServerError(OptionMessage.Failed);
		}

		return true;
	}

	/**
	 * option's removal process manager service
	 * @param {string|object} id - option's object id
	 * @returns {promise<boolean>} - return true if the process was successful
	 */
	async removeById(id) {
		/** check option existence */
		await this.checkExistById(id);
		/** remove option from database */
		const removeResult = await this.#model.deleteOne({ _id: id });
		/** return error if removal process wasn't successful */
		if (removeResult.deletedCount <= 0) {
			throw new createHttpError.InternalServerError(OptionMessage.Failed);
		}

		return true;
	}

	/**
	 * check options existence based on key and category id
	 * @param {string} key - option key value
	 * @param {string} category - category object id
	 * @param {string} exceptionId - the exceptional option object id
	 * @returns {null} - return null if the option was notfound
	 */
	async alreadyExistByCategoryAndKey(key, category, exceptionId = null) {
		/** retrieve option data from database */
		const isExist = await this.#model.exists({
			_id: { $ne: new mongoose.Types.ObjectId(exceptionId) },
			category: new mongoose.Types.ObjectId(category),
			key,
		});

		/** throw error if option exists */
		if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist);

		/** return null if the option was not found */
		return null;
	}

	/**
	 * check option existence by object id and return the option's data
	 * @param {string|object} id - requested option object id
	 * @returns {object} - return option's data object
	 */
	async checkExistById(id) {
		/** retrieve option from database */
		const option = await this.#model.findById(id);
		/** throw error if option was notfound */
		if (!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
		/** return option data */
		return copyObject(option);
	}
}

module.exports = new OptionService();
