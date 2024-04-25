const OptionMessage = Object.freeze({
	Created: "option created successfully",
	NotFound: "option not found",
	AlreadyExist: "option already exist",
	Deleted: "option removed successfully",
	Updated: "option updated successfully",
	Failed: "process failed, please try again",
	RequiredTitle: "The title field is required",
	RequiredKey: "The key field is required",
	RequiredType: "The type field is required",
	RequiredCategory: "The category field is required",
	InvalidCategory: "The category field is invalid",
	InvalidType: "The type field is invalid",
	InvalidRequired: "The required field is invalid",
	InvalidGuidType: "The guid field should be string",
});

module.exports = { OptionMessage };
