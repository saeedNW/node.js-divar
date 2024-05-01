/** import multer module */
const multer = require("multer");
/** import path module */
const path = require("path");
/** import file system module */
const fs = require("fs-extra");
/** import http-error module */
const createHttpError = require("http-errors");
/** import slugify */
const { default: slugify } = require("slugify");

/**
 * create file temporary upload directory
 * @returns {string} - path to the temporary upload directory
 */
function temporaryUploadDirectory() {
	/**
	 * define temporary upload directory
	 * @type {string}
	 */
	const uploadPath = process.cwd() + "/public/uploads/temp";

	/**
	 * create upload path if it doesn't exist
	 */
	fs.ensureDirSync(uploadPath, { recursive: true });

	/**
	 * return the temp directory path
	 */
	return uploadPath;
}

/**
 * multer storage configuration
 * @type {DiskStorage}
 */
const storage = multer.diskStorage({
	/**
	 * set uploaded file destination
	 * @param {object} req - express request object
	 * @param {object} file - uploaded file data
	 * @param cb - callback
	 * @returns {*} - uploaded file destination callback
	 */
	destination: (req, file, cb) => {
		/** create and return file path if file was uploaded */
		if (file?.originalname) {
			return cb(null, temporaryUploadDirectory());
		}

		return cb(null, null);
	},

	/**
	 * uploaded file name creator
	 * @param {object} req - express request object
	 * @param {object} file - uploaded file data
	 * @param cb - callback
	 * @returns {*} - uploaded file new name callback
	 */
	filename: (req, file, cb) => {
		/** create and return file path if file was uploaded */
		if (file?.originalname) {
			/**
			 * extract file type
			 * @type {string}
			 */
			const type = path.extname(file?.originalname || "");

			/**
			 * get file original name and replace white spaces with '-'
			 * @type {string}
			 */
			const originalName = slugify(
				path.basename(
					file?.originalname || "",
					path.extname(file?.originalname || "")
				)
			);

			/**
			 * define file new name
			 * @type {string}
			 */
			const fileTempName = String(Date.now() + originalName + type);

			return cb(null, fileTempName);
		}

		return cb(null, null);
	},
});

/**
 * multer file filter for images
 * @param {object} req - express request object
 * @param {object} file - uploaded file data
 * @param cb - callback
 * @returns {*}
 */
function imageFileFilter(req, file, cb) {
	/**
	 * get file type extension
	 * @type {string}
	 */
	const fileExt = path.extname(file?.originalname);

	/**
	 * define file valid mime types
	 * @type {string[]}
	 */
	const validMimeTypes = [".jpg", ".png", ".jpeg", ".webp"];

	/**
	 * return error if the file format is invalid
	 */
	if (!validMimeTypes.includes(fileExt)) {
		return cb(
			new createHttpError.UnprocessableEntity("The file format is invalid")
		);
	}

	return cb(null, true);
}

/**
 * handle multer image file size limit error
 * @param {object} err - error object
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @param next express next function
 * @returns {*}
 */
function handleMulterImageSizeError(err, req, res, next) {
	/**
	 * Check if the error is due to exceeding the file size limit.
	 */
	if (err && err.code === "LIMIT_FILE_SIZE") {
		/**
		 * Create a custom error for an unprocessable
		 * entity due to invalid image size.
		 * Pass the custom error to the next middleware.
		 */
		return next(
			new createHttpError.UnprocessableEntity(
				"The file size is larger than the maximum requirement"
			)
		);
	}

	/**
	 * If there is an error other than the file size limit error,
	 * pass it to the next middleware.
	 */
	if (err) return next(err);

	/**
	 * If there is no error, move to the next middleware.
	 */
	return next();
}

/**
 * remove uploaded files based on files data
 * @param {object} files - data of the uploaded files
 * @param {boolean} multiFile - determined which a single file should be removed or multiply files
 * @returns {boolean} - end process result
 */
function removeFileByDataObject(files, multiFile = false) {
	/**
	 * check if there is multiply files
	 */
	if (multiFile) {
		/**
		 * loop over files
		 */
		for (const [key, file] of Object.entries(files)) {
			/**
			 * check if the file exists
			 */
			if (fs.pathExistsSync(file?.path)) {
				/**
				 * remove the file
				 */
				fs.removeSync(file?.path);
			}
		}

		/** end the process */
		return true;
	}

	/**
	 * if there was only one file uploaded,
	 * check its existence and then remove it
	 */
	if (fs.pathExistsSync(files?.path)) fs.removeSync(files?.path);

	/** end the process */
	return true;
}

/**
 * file upload finalization process
 * @param {object} file - data of the uploaded files
 * @param {string} uploadPath - file final upload location
 * @param {object|string|undefined} itemId - object id of the data that the file belong to
 * @returns {{fileName: string, filePath: string}|string|boolean} - uploaded file location path and name
 */
function uploadFinalization(file, uploadPath, itemId = undefined) {
	/**
	 * return false if file does not exist
	 */
	if (!file) return false;

	/** define file real path */
	let filePath = itemId
		? `./public/uploads/${uploadPath}/${itemId}`
		: `./public/uploads/${uploadPath}`;

	/**
	 * create upload path if it doesn't exist
	 */
	fs.ensureDirSync(filePath, { recursive: true });

	/**
	 * extract file type
	 * @type {string}
	 */
	const type = path.extname(file?.originalname || "");

	/**
	 * get file original name and replace white spaces with '-'
	 * @type {string}
	 */
	const originalName = slugify(
		path.basename(
			file?.originalname || "",
			path.extname(file?.originalname || "")
		)
	);

	/**
	 *  define file name
	 *  @type {string}
	 */
	const fileName = itemId
		? String(Date.now() + "-" + itemId.toString() + "-" + originalName + type)
		: String(Date.now() + "-" + originalName + type);

	/**
	 * move file to its original directory
	 */
	fs.moveSync(file.path, `${filePath}/${fileName}`, { overwrite: true });

	return `${filePath}/${fileName}`.slice(8);
}

/** define files size limit  */
const fileMaxSize = 10000 * 1000; /** 3MB file size limit */

/** create multer file uploader with defined storage configuration */
const FileUploader = multer({
	storage,
	fileFilter: imageFileFilter,
	limits: { fileSize: fileMaxSize },
});

module.exports = {
	FileUploader,
	handleMulterImageSizeError,
	removeFileByDataObject,
	uploadFinalization,
};
