/**
 * User profile and data process class service
 * @module UserService
 */

/** import auto bind */
const autoBind = require("auto-bind");
/** import user model */
const { UserModel } = require("../user/user.model");

class UserService {
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
}

module.exports = new UserService();
