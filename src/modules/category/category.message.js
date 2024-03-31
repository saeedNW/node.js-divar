const CategoryMessage = Object.freeze({
	Created: "category created successfully",
	NotFound: "category notfound",
	AlreadyExist: "category already exist",
	Deleted: "category removed successfully",
	RequiredName: "The name field is required",
	RequiredIcon: "The icon field is required",
	InvalidParent: "The parent id is invalid",
	InvalidCategoryId: "Invalid category object id",
});

module.exports = { CategoryMessage };
