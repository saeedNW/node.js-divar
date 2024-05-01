/**
 * convert Persian and Arabic numbers to English numbers
 * @param num
 * @return {string|string}
 */
function fixNumbers(num) {
	/** remove commas */
	num = num ? num.toString().replaceAll(",", "") : num;

	// prettier-ignore
	const persianNumbers = [
		/۰/g, /۱/g, /۲/g, /۳/g, /۴/g,
		/۵/g, /۶/g, /۷/g, /۸/g, /۹/g
	];
	// prettier-ignore
	const arabicNumbers = [
		/٠/g, /١/g, /٢/g, /٣/g, /٤/g,
		/٥/g, /٦/g, /٧/g, /٨/g, /٩/g
	];

	if (typeof num === "string") {
		for (let i = 0; i < 10; i++) {
			num = num.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
		}
	}
	return num ? num.toString().replaceAll(",", "") : num;
}

/**
 * Fixes every Persian and Arabic number in a data object
 * @param {object} data - Object of data that needs to be fixed
 */
function fixDataNumbers(data) {
	/** loop over data object */
	Object.keys(data).forEach((key) => {
		/** fix persian and arabic numbers */
		if (typeof data[key] === "string" || typeof data[key] === "number") {
			data[key] = fixNumbers(data[key]);
		}

		if (Array.isArray(data[key]) && data[key].length > 0) {
			/** if the value is a non empty array, recursively fix numbers in the array */
			fixDataNumbers(data[key]);
		} else if (typeof data[key] === "object" && data[key] !== null) {
			/** if the value is a non empty object, recursively fix numbers in the object */
			fixDataNumbers(data[key]);
		}
	});
}

/**
 * remove invalid properties in an object
 * @param {object} data - data object that needs to be validated
 * @param {array<any>} blackListFields - list of the fields that has to be removed
 * @param {array<any>} nullableFields - list of the fields that can be empty and shouldn't be removed
 */
function deleteInvalidPropertyInObject(
	data = {},
	blackListFields = [],
	nullableFields = []
) {
	/**
	 * define invalid and nullish data
	 * @type {(string|number)[]}
	 */
	let nullishData = ["", " ", "0", 0, null, undefined];

	/** loop over data object properties */
	Object.keys(data).forEach((key) => {
		/** remove property if it's a blacked listed data */
		if (blackListFields.includes(key)) delete data[key];

		/** remove array properties if it's empty */
		if (
			Array.isArray(data[key]) &&
			data[key].length === 0 &&
			!nullableFields.includes(key)
		) {
			delete data[key];
		}

		/** remove property if it's an invalid or nullish data */
		if (nullishData.includes(data[key]) && !nullableFields.includes(key))
			delete data[key];

		/** proceed if data is a nested object */
		if (typeof data[key] === "object" && data[key] !== null) {
			/** loop over data object properties */
			Object.keys(data[key]).forEach((prop) => {
				/** remove property if it's a blacked listed data */
				if (blackListFields.includes(prop)) delete data[key][prop];
				/** remove property if it's an invalid or nullish data */
				if (
					nullishData.includes(data[key][prop]) &&
					!nullableFields.includes(prop)
				)
					delete data[key][prop];
			});

			/** remove object properties if it's empty */
			if (Object.keys(data[key]).length === 0 && !nullableFields.includes(key))
				delete data[key];
		}
	});
}

/**
 * send successful response to user
 * @param {object} res - express response object
 * @param {number} status - response status code
 * @param {string|undefined} message - response message
 * @param {object} data - response data
 */
function sendSuccessResponse(res, status, message = undefined, data = {}) {
	res.status(status).json({
		status,
		success: true,
		message: message || "Request has ended successfully",
		data,
	});
}

/**
 * copy the given object
 * @param object
 * @returns {any}
 */
function copyObject(object) {
	return JSON.parse(JSON.stringify(object));
}

/**
 * Checks if a value is considered 'true'.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is considered 'true', false otherwise.
 */
const isTrue = (value) => ["true", 1, true].includes(value);

/**
 * Checks if a value is considered 'false'.
 * @param {*} value - The value to check.
 * @returns {boolean} - True if the value is considered 'false', false otherwise.
 */
const isFalse = (value) => ["false", 0, false].includes(value);

/**
 * converts a given field into an array.
 * @param {string|string[]} field - the input string or array-like string.
 * @returns {string[]} - the resulting array.
 */
function stringToArray(field) {
	/** Check if the field exists */
	if (field) {
		if (typeof field === "string") {
			/**
			 * Check if the field's value is a string.
			 * Split the string based on '#' or ',' and trim each item
			 */
			field = field.split(/#|,/).map((item) => item.trim());
		} else if (Array.isArray(field)) {
			/** If the field's value is already an array, trim each item in the array */
			field = field.map((item) => item.trim());
		}
	} else {
		/** If the field is not present, set it to an empty array */
		field = [];
	}

	return field;
}

module.exports = {
	fixNumbers,
	fixDataNumbers,
	deleteInvalidPropertyInObject,
	sendSuccessResponse,
	copyObject,
	isTrue,
	isFalse,
	stringToArray,
};
