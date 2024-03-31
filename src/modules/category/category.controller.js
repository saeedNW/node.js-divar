/**
 * category management class controller
 * @module CategoryController
 */

/** import auto bind */
const autoBind = require("auto-bind");
/** import category service */
const CategoryService = require("./category.service");
/** import category message */
const { CategoryMessage } = require("./category.message");
/** import http status codes */
const { StatusCodes: httpStatus } = require("http-status-codes");
/** import utility functions */
const {
	copyObject,
	deleteInvalidPropertyInObject,
	fixDataNumbers,
	sendSuccessResponse,
} = require("../../common/utils/functions");

class CategoryController {
	/**
	 * category service private variable
	 * @private
	 */
	#service;

	/** category class controller constructor */
	constructor() {
		/** initialize auto bind */
		autoBind(this);
		/**
		 * set private service variable's value
		 * @private
		 */
		this.#service = CategoryService;
	}

	/**
	 * new category creation process
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async create(req, res, next) {
		try {
			/** extract data from request body */
			const data = copyObject(req.body);
			/** remove invalid values from data */
			deleteInvalidPropertyInObject(data);
			/** fix persian and arabic numbers */
			fixDataNumbers(data);
			/** initialize create category service module */
			await this.#service.create(data);
			/** send success message */
			return sendSuccessResponse(
				res,
				httpStatus.CREATED,
				CategoryMessage.Created
			);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * retrieve categories list
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async find(req, res, next) {
		try {
			/** get categories from service module */
			const categories = await this.#service.find();
			/** send success message */
			return sendSuccessResponse(res, httpStatus.OK, undefined, { categories });
		} catch (err) {
			next(err);
		}
	}

	/**
	* category removal process
	* @param {Object} req express request
	* @param {Object} res express response
	* @param {function} next express next function
	* @returns {Promise<void>}
	*/
	async remove(req, res, next) {
		try {
			/** retrieve category id from request params */
			const { id } = req.params;
			/** category removal service module */
			await this.#service.remove(id);
			/** send success message */
			return sendSuccessResponse(
				res,
				httpStatus.OK,
				CategoryMessage.Deleted
			)
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new CategoryController();
