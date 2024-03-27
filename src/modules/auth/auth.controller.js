/**
 * User authentication process class controller
 * @module AuthController
 */

/** import authentication service */
const AuthService = require("./auth.service");
/** import authentication message */
const { AuthMessage } = require("./auth.messages");
/** import auto bind */
const autoBind = require("auto-bind");
/** import http status codes */
const { StatusCodes: httpStatus } = require("http-status-codes");
/** import cookies enum */
const { CookiesName } = require("../../common/constants/cookies.enum");
/** import node environments enum */
const { NodeEnv } = require("../../common/constants/env.enum");
/** import utilities */
const {
	fixNumbers,
	sendSuccessResponse,
	fixDataNumbers,
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
		this.#service = AuthService;
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
				httpStatus.OK,
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
			/** fix persian and arabic numbers in request body */
			fixDataNumbers(req.body);
			/** extract data from request body */
			const { mobile, code } = req.body;
			/** initialize check otp service module */
			const token = await this.#service.checkOTP(mobile, code);
			/** set user access token cookie */
			res.cookie(CookiesName.AccessToken, `Bearer ${token}`, {
				httpOnly: true,
				secure: process.env.NODE_ENV === NodeEnv.Production,
				signed: true,
			});
			/** send success message */
			return sendSuccessResponse(
				res,
				httpStatus.OK,
				AuthMessage.LoginSuccessfully,
				{ token }
			);
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
