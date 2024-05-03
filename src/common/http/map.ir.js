/** import axios module */
const { default: axios } = require("axios");

/**
 * Fetches address details based on latitude and longitude.
 * @param {number} lat - The latitude coordinate.
 * @param {number} lng - The longitude coordinate.
 * @returns {Object} - An object containing address details.
 */
const getAddressDetail = async (lat, lng) => {
	let result;
	/** Check if latitude and longitude are provided */
	if (lat && lng) {
		/** Fetch address details using axios */
		result = await axios
			.get(`${process.env.MAP_IR_URL}?lat=${lat}&lon=${lng}`, {
				/** Set headers including API key */
				headers: {
					"x-api-key": process.env.MAP_API_KEY,
				},
			})
			.then((res) => res.data);
	}
	/** Extract relevant address details from the result */
	return {
		province: result?.province,
		city: result?.city,
		district: result?.region ?? result?.district,
		address: result?.address,
	};
};

module.exports = {
	getAddressDetail,
};
