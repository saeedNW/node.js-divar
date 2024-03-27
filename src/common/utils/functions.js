/**
 * convert Persian and Arabic numbers to English numbers
 * @param num
 * @return {string|string}
 */
function fixNumbers(num) {
	/** remove commas */
	num = num ? num.replaceAll(",", "") : num;

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
	return num ? num.replaceAll(",", "") : num;
}

/**
 * Fixes every Persian and Arabic number in a data object
 * @param {object} data - Object of data that needs to be fixed
 */
function fixDataNumbers(data) {
	/** loop over data object */
	Object.keys(data).forEach((key) => {
		/** fix persian and arabic numbers */
		data[key] = fixNumbers(data[key]);

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

module.exports = {
	fixNumbers,
	fixDataNumbers,
	deleteInvalidPropertyInObject,
	sendSuccessResponse,
	copyObject,
};
