/** import http errors */
const createHttpError = require("http-errors");
/** import Authorization common messages */
const { AuthorizationMessage } = require("../messages/auth.message");
/** import jwt  */
const jwt = require("jsonwebtoken");
/** import user model */
const { UserModel } = require("../../modules/user/user.model");
/** import cookies name enum */
const { CookiesName } = require("../constants/cookies.enum");

/**
 * check user cookies for access token and authorize the user
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param {Function} next - express next function
 * @returns {Promise<void>}
 */
const AuthorizationGuard = async (req, res, next) => {
	try {
		/**
		 * retrieve token from request cookies or header
		 * @type {string}
		 */
		const token = getToken(req?.signedCookies, req?.headers);

		/**
		 * verify jwt token
		 * @type {*}
		 */
		const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

		/** throw error if the payload was invalid */
		if (typeof payload !== "object" || "id" in payload === false) {
			throw new createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
		}

		/** retrieve user data from database */
		const user = await UserModel.findById(payload.id, {
			accessToken: 0,
			otp: 0,
			__v: 0,
			updatedAt: 0,
			verifiedMobile: 0,
		}).lean();

		/** throw error if user was notfound */
		if (!user) {
			throw new createHttpError.Unauthorized(
				AuthorizationMessage.NotFoundAccount
			);
		}

		/** register user in the request */
		req.user = user;

		return next();
	} catch (error) {
		next(error);
	}
};

/**
 * extract user access token from cookies or request headers
 * @param {object} cookies - express request cookies
 * @param {object} headers - express request headers
 * @returns {*}
 */
function getToken(cookies, headers) {
	/**
	 * get Bearer token from request header.
	 * split token to "Bearer" and token
	 */
	const [Bearer, token] =
		cookies?.[CookiesName.AccessToken]?.split(" ") ||
		headers?.[CookiesName.AccessToken]?.split(" ") ||
		[];

	/**
	 * validate token to be a Bearer token.
	 * return token if token was valid
	 */
	if (token && ["Bearer", "bearer"].includes(Bearer)) return token;

	/** return error if token was invalid */
	throw new createHttpError.Unauthorized(AuthorizationMessage.Login);
}

module.exports = { AuthorizationGuard };
