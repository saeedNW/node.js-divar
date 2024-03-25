module.exports = Object.freeze({
	/**
	 * phone number regex.
	 * this regex usage is to validate if the entered number is a valid phone number.
	 */
	PhoneRegEx: new RegExp(
		"^(?:(٠٩[٠-٩][٠-٩]{8})|(۰۹[۰-۹][۰-۹]{8})|(09[0-9][0-9]{8}))$"
	),
});
