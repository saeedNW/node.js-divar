/**
 * posts management class controller
 * @module PostController
 */

/** import auto bind */
const autoBind = require("auto-bind");
/** import post message */
const { PostMessage } = require("./post.message");
/** import post service */
const PostService = require("./post.service");
/** import category service */
const categoryService = require("../category/category.service");
/** import utf8 module */
const utf8 = require("utf8");
/** import multer utils */
const { uploadFinalization } = require("../../common/utils/multer");
/** import map ir location module */
const { getAddressDetail } = require("../../common/http/map.ir");
/** import utility functions */
const {
	deleteInvalidPropertyInObject,
	copyObject,
	fixDataNumbers,
} = require("../../common/utils/functions");

class PostController {
	/**
	 * post service private variable
	 * @private
	 */
	#service;
	/**
	 * category service private variable
	 */
	#categoryService;
	/**
	 * define a success message variable
	 * to be used during the process going
	 * through different methods
	 */
	success_message;

	/** Auth class controller constructor */
	constructor() {
		/** initialize auto bind */
		autoBind(this);
		/**
		 * set private service variable's value
		 * @private
		 */
		this.#service = PostService;
		/**
		 * set private category service variable's value
		 * @private
		 */
		this.#categoryService = categoryService;
	}

	/**
	 * new port page render process
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async newPostPage(req, res, next) {
		try {
			/** extract category's slug from request query */
			let { slug } = req.query;
			/** define a variable to be used in case the back button was needed */
			let showBack = false;
			/** define a database query option */
			let query = { parent: null };
			/** this variables will be used to store category and  its options */
			let options, category;
			/** retrieve category and its options if slug was provided */
			if (slug) {
				/** trim the slug */
				slug = slug.trim();
				/** retrieve category data */
				category = await this.#categoryService.checkExistBySlug(slug);
				/** retrieve category options */
				options = await this.#service.getCategoryOptions(category._id);
				/** set show back button value to true */
				showBack = true;
				/** set query value */
				query = { parent: category._id };
			}
			/** retrieve categories data */
			const categories = await this.#categoryService.findCategoriesByAggregate(
				query
			);
			/** render new category page */
			res.render("./pages/panel/create-post.ejs", {
				categories,
				showBack,
				category: category?._id.toString(),
				options,
			});
		} catch (err) {
			next(err);
		}
	}

	/**
	 * new post creation process
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
			/** define an empty array to store uploaded images */
			data.images = [];
			/** iterate over files in req.files */
			for (const [key, file] of Object.entries(req.files || {})) {
				/** finalize file upload process */
				const uploadedFilePath = uploadFinalization(file, "posts");
				/** add uploaded file path to data */
				data.images.push(uploadedFilePath);
			}
			/** get user location data based on provided lat and lng */
			const locationInfo = await getAddressDetail(data.lat, data.lng);
			/** add user object id to data */
			data.userId = req.user._id;
			/** merge lat and lng values to coordinate */
			data.coordinate = [data.lat, data.lng];
			/** add options to data */
			data.options = this.extractNewPostOptions(data);
			/** add location info to data */
			Object.assign(data, locationInfo);
			/** initialize post creations process service */
			await this.#service.create(data);
			/** set the value of the success message */
			this.success_message = PostMessage.Created;
			/** redirect user to their posts page */
			return res.redirect("/post/my");
		} catch (err) {
			next(err);
		}
	}

	/**
	 * extract post options value from other post data
	 * @param {object} data - new post data
	 * @returns {object} - extracted options data object
	 */
	extractNewPostOptions(data) {
		/** make a copy from data params to remove any type of references */
		const options = { ...data };
		/** iterate over each key in the options object */
		for (const key in options) {
			/** split key by "_" as identifier and option name */
			let [identifier, optionName] = key.split("_");
			if (!identifier || identifier !== "option") {
				/**
				 * remove the key and its value from options object
				 * if the identifier didn't exists or it was anything
				 * but "option".
				 * Post options' key should be defined as "option_optionName".
				 * EX: options_color
				 */
				delete options[key];
			} else {
				/** Retrieve the corresponding value */
				let value = options[key];
				/** Remove the original key */
				delete options[key];
				/** Decode the key from UTF-8 encoding */
				optionName = utf8.decode(optionName);
				/** Assign the value back to the options object with the decoded key */
				options[optionName] = value;
			}
		}

		/** return options data object result */
		return options;
	}

	/**
	 * retrieve user's created posts
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async findMyPosts(req, res, next) {
		try {
			/** extract user id */
			const userId = req.user._id;
			/** retrieve user's posts */
			const posts = await this.#service.find(userId);
			/** render user's posts page */
			res.render("./pages/panel/posts", {
				posts,
				count: posts.length,
				success_message: this.success_message,
				error_message: null,
			});
			/** empty success message */
			this.success_message = null;
		} catch (err) {
			next(err);
		}
	}

	/**
	 * posts removal process
	 * @param {Object} req express request
	 * @param {Object} res express response
	 * @param {function} next express next function
	 * @returns {Promise<void>}
	 */
	async remove(req, res, next) {
		try {
			/** extract post id from request */
			const { id } = req.params;
			/** initialize post removal service */
			await this.#service.remove(id);
			/** set success message */
			this.success_message = PostMessage.Deleted;
			/** redirect user to their posts page */
			return res.redirect("/post/my");
		} catch (err) {
			next(err);
		}
	}

	/**
	* single posts page
	* @param {Object} req express request
	* @param {Object} res express response
	* @param {function} next express next function
	* @returns {Promise<void>}
	*/
	async showPost(req, res, next) {
		try {
			/** extract posts id from request */
			const { id } = req.params;
			/** retrieve posts data */
			const post = await this.#service.checkExist(id);
			/** set page layout */
			res.locals.layout = "./layouts/website/main";
			/** render single post page */
			res.render("./pages/home/post", {
				post,
			});
		} catch (err) {
			next(err);
		}
	}

	/**
	* retrieve posts list and page
	* @param {Object} req express request
	* @param {Object} res express response
	* @param {function} next express next function
	* @returns {Promise<void>}
	*/
	async postList(req, res, next) {
		try {
			/** extract query from database */
			const query = req.query;
			/** retrieve posts data */
			const posts = await this.#service.findAll(query);
			/** set page layout */
			res.locals.layout = "./layouts/website/main";
			/** render single post page */
			res.render("./pages/home/index", {
				posts,
			});
		} catch (err) {
			next(err);
		}
	}
}

module.exports = new PostController();
