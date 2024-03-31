/**
 * category management class service
 * @module CategoryService
 */

/** import auto bind */
const autoBind = require("auto-bind");
/** import category model */
const { CategoryModel } = require("./category.model");
/** import option model */
const { OptionModel } = require("../option/option.model");
/** import mongoose types */
const { Types } = require("mongoose");
/** import http-error module */
const createHttpError = require("http-errors");
/** import category message */
const { CategoryMessage } = require("./category.message");
/** import slugify */
const { default: slugify } = require("slugify");
/** import utility functions */
const { copyObject } = require("../../common/utils/functions");

class CategoryService {
	/**
	 * category model private variable
	 * @private
	 */
	#model;
	/**
	 * option model private variable
	 * @private
	 */
	#optionModel;

	/** category class service constructor */
	constructor() {
		/** initialize auto bind */
		autoBind(this);
		/**
		 * set private model variable's value
		 * @private
		 */
		this.#model = CategoryModel;
		/**
		 * set private option model variable's value
		 * @private
		 */
		this.#optionModel = OptionModel;
	}

	/**
	 * return categories list
	 * @returns {Array<any>} - categories list
	 */
	async find() {
		/** retrieve categories from database */
		let categories = await this.#model.find({ parent: { $exists: false } });
		/** return data */
		return copyObject(categories);
	}

	/**
	 * remove category
	 * @param {string} id - category object id
	 * @returns {boolean}
	 */
	async remove(id) {
		/** check category existence */
		await this.checkExistById(id);
		/** remove the category */
		await this.#model.deleteMany({ _id: id });
		/** return the process result */
		return true;
	}

	/**
	 * create new category
	 * @param {object} categoryDto - category data
	 * @returns {Promise<*>}
	 */
	async create(categoryDto) {
		/** proceed if the category is a sub category */
		if (categoryDto?.parent) {
			/** check parent category existence */
			const existCategory = await this.checkExistById(categoryDto.parent);
			/** set category's parent category id */
			categoryDto.parent = existCategory._id;
			/** set category's parents categories list */
			categoryDto.parents = [
				...new Set(
					[existCategory._id.toString()]
						.concat(existCategory.parents.map((id) => id.toString()))
						.map((id) => new Types.ObjectId(id))
				),
			];
		}

		/** create a slug for category */
		if (categoryDto?.slug) {
			categoryDto.slug = slugify(categoryDto.slug);
			await this.alreadyExistBySlug(categoryDto.slug);
		} else {
			categoryDto.slug = slugify(categoryDto.name);
		}

		/** save category in database */
		const category = await this.#model.create(categoryDto);
		/** return created category */
		return copyObject(category);
	}

	async checkExistById(id) {
		const category = await this.#model.findById(id);
		if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
		return copyObject(category);
	}

	async checkExistBySlug(slug) {
		const category = await this.#model.findOne({ slug });
		if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
		return copyObject(category);
	}

	async alreadyExistBySlug(slug) {
		const category = await this.#model.findOne({ slug });
		if (category)
			throw new createHttpError.Conflict(CategoryMessage.AlreadyExist);
		return null;
	}
}
module.exports = new CategoryService();
