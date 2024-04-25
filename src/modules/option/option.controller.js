/**
 * Options management class controller
 * @module OptionController
 */

/** import auto bind */
const autoBind = require("auto-bind");
/** import options service */
const OptionService = require("./option.service");
/** import options message */
const { OptionMessage } = require("./option.message");
/** import http status codes */
const { StatusCodes: httpStatus } = require("http-status-codes");
/** import utility functions */
const {
	copyObject,
	deleteInvalidPropertyInObject,
	sendSuccessResponse,
	fixDataNumbers,
} = require("../../common/utils/functions");

class OptionController {
	/**
	 * auth service private variable
	 * @private
	 */
	#service;

	/** options class controller constructor */
	constructor() {
		/** initialize auto bind */
		autoBind(this);
		/**
		 * set private service variable's value
		 * @private
		 */
		this.#service = OptionService;
	}

	/**
	 * new option creation process
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
			/** initialize create option service module */
			await this.#service.create(data);
			/** send success message */
			return sendSuccessResponse(
				res,
				httpStatus.CREATED,
				OptionMessage.Created
			);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * find options
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async find(req, res, next) {
		try {
			/** initialize find options service module */
			const options = await this.#service.find();
			/** send success message */
			return sendSuccessResponse(res, httpStatus.OK, undefined, { options });
		} catch (err) {
			next(err);
		}
	}

	/**
	 * find options by category id
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async findByCategoryId(req, res, next) {
		try {
			/** extract category id from request params */
			const { categoryId } = req.params;
			/** initialize find options service module */
			const options = await this.#service.findByCategoryId(categoryId);
			/** send success message */
			return sendSuccessResponse(res, httpStatus.OK, undefined, { options });
		} catch (err) {
			next(err);
		}
	}

	/**
	 * find options by category slug
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async findByCategorySlug(req, res, next) {
		try {
			/** extract slug from request params */
			const { categorySlug } = req.params;
			/** initialize find options service module */
			const options = await this.#service.findByCategorySlug(categorySlug);
			/** send success message */
			return sendSuccessResponse(res, httpStatus.OK, undefined, { options });
		} catch (err) {
			next(err);
		}
	}

	/**
	 * find single option with id
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async findById(req, res, next) {
		try {
			/** extract option is from request params */
			const { id } = req.params;
			/** initialize single option find service module */
			const option = await this.#service.findById(id);
			/** send success message */
			return sendSuccessResponse(res, httpStatus.OK, undefined, { option });
		} catch (err) {
			next(err);
		}
	}

	/**
	 * option update process
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async update(req, res, next) {
		try {
			/** extract data from request body */
			const data = copyObject(req.body);
			/** extract option id from request params */
			const { id } = req.params;
			/** remove invalid values from data */
			deleteInvalidPropertyInObject(data);
			/** fix persian and arabic numbers */
			fixDataNumbers(data);
			/** initialize update option service module */
			await this.#service.update(id, data);
			/** send success message */
			return sendSuccessResponse(res, httpStatus.OK, OptionMessage.Updated);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * remove option process
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async removeById(req, res, next) {
		try {
			/** extract option id from request params */
			const { id } = req.params;
			/** initialize options removal service module */
			await this.#service.removeById(id);
			/** send success message */
			return sendSuccessResponse(res, httpStatus.OK, OptionMessage.Deleted);
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new OptionController();
