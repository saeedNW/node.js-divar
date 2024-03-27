/**
 * User profile and data process class controller
 * @module UserController
 */

/** import user service */
const UserService = require("./user.service");
/** import auto bind */
const autoBind = require("auto-bind");
/** import http status codes */
const { StatusCodes: httpStatus } = require("http-status-codes");
/** import utility functions */
const {
	copyObject,
	sendSuccessResponse,
} = require("../../common/utils/functions");

class UserController {
	/**
	 * auth service private variable
	 * @private
	 */
	#service;

	/** Auth class controller constructor */
	constructor() {
		/** initialize auto bind */
		autoBind(this);
		/**
		 * set private service variable's value
		 * @private
		 */
		this.#service = UserService;
	}

	/**
	 * retrieve user profile data
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async profile(req, res, next) {
		try {
			/** retrieve user data from request */
			const user = copyObject(req.user);
			/** send success message */
			return sendSuccessResponse(res, httpStatus.OK, undefined, { user });
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new UserController();
