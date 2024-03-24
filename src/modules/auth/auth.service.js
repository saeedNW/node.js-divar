/**
 * User authentication process class service
 * @module AuthService
 */

/** import auto bind */
const autoBind = require("auto-bind");
/** import user model */
const UserModel = require("../user/user.model");
/** import http-error module */
const createHttpError = require("http-errors");
/** import authentication message */
const { AuthMessage } = require("./auth.messages");
/** import crypto module */
const { randomInt } = require("crypto");

class AuthService {
	/**
	 * user model private variable
	 * @private
	 */
	#model;

	/** Auth class service constructor */
	constructor() {
		/** initialize auto bind */
		autoBind(this);
		/**
		 * set private model variable's value
		 * @private
		 */
		this.#model = UserModel;
	}

	/**
	 * send OTP code service
	 * @@param {string} mobile - user phone number
	 * @returns {Promise<*>} - user data object
	 */
	async sendOTP(mobile) {
		/**
		 * save/update user in database
		 * @type {*}
		 */
		const user = await this.createUser(mobile);
		/** return error if user creation failed */
		if (!user) {
			throw new createHttpError.InternalServerError(
				AuthMessage.InternalServerError
			);
		}
		/** return user data */
		return user;
	}

	/**
	 * OTP code validator service
	 * @param {string} mobile - user phone number
	 * @param {number} code - user OTP code
	 */
	async checkOTP(mobile, code) {}

	/**
	 *
	 * @param {string} mobile - user mobile number
	 * @returns {Promise<*>} - user data object
	 */
	async createUser(mobile) {
		/** get current date-time */
		const currentTime = new Date().getTime();
		/**
		 * define user opt code info
		 * @type {{code:number, expiresIn:number}}
		 */
		const otp = {
			code: randomInt(10000, 99999),
			expiresIn: currentTime + 2 * 60 * 1000,
		};
		/** check for user existence */
		const userDate = await this.checkUserExistence({ mobile });
		/** update user if it exists */
		if (userDate) return await this.updateUser(userDate, otp, currentTime);
		/** create new user if user wasn't found, */
		return await this.#model.create({ mobile, otp });
	}

	/**
	 * update user data
	 * @param {object} userDate - user data object
	 * @param {{code:number, expiresIn:number}} otp - data which you plan on update
	 * @param {{number}} currentTime - current date-time
	 * @returns {{object}} - user data object
	 */
	async updateUser(userDate, otp, currentTime) {
		/** throe error if otp has not expired */
		if (userDate.otp.code && userDate.otp.expiresIn > currentTime) {
			throw new createHttpError.BadRequest(AuthMessage.OTPNotExpired);
		}
		/** update user otp data */
		userDate.otp = { ...otp };
		/** save user data */
		await userDate.save();
		/** return user data */
		return userDate;
	}

	/**
	 * check user existence
	 * @param {object} query - database search query
	 * @returns {undefined|object} - undefined or user data object
	 */
	async checkUserExistence(query) {
		/** retrieve user data from database */
		const user = await this.#model.findOne({ ...query });
		/** throw error if the user was not found */
		if (!user) return undefined;
		/** return user data */
		return user;
	}
}

module.exports = new AuthService();
