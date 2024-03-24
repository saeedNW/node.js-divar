/**
 * User authentication process class controller
 * @module AuthController
 */

/** import authentication service */
const authService = require("./auth.service");
/** import authentication message */
const { AuthMessage } = require("./auth.messages");
/** import auto bind */
const autoBind = require("auto-bind");
/** import http status codes */
const { StatusCodes } = require("http-status-codes");
/** import utilities */
const {
	fixNumbers,
	sendSuccessResponse,
} = require("../../common/utils/functions");

class AuthController {
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
		this.#service = authService;
	}

	/**
	 * send OTP code
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async sendOTP(req, res, next) {
		try {
			/**
			 * user phone number
			 * @type {string}
			 */
			const mobile = fixNumbers(req.body.mobile);
			/** initialize send otp service module */
			const user = await this.#service.sendOTP(mobile);
			/** send success response */
			return sendSuccessResponse(
				res,
				StatusCodes.OK,
				AuthMessage.SentOTPSuccessfully,
				{ otp: user.otp.code }
			);
		} catch (err) {
			next(err);
		}
	}

	/**
	 * OTP code validator
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async checkOTP(req, res, next) {
		try {
		} catch (err) {
			next(err);
		}
	}

	/**
	 * user logout manager
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async logout(req, res, next) {
		try {
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new AuthController();
