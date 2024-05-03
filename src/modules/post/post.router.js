/** import express module */
const express = require("express");
/** create express Router instance */
const PostRouter = express.Router();
/** import post controller */
const PostController = require("./post.controller");
/** import file uploader */
const {
	FileUploader,
	handleMulterImageSizeError,
} = require("../../common/utils/multer");
/** import authorization guard */
const {
	AuthorizationGuard,
} = require("../../common/guard/authorization.guard");

/** new post page */
PostRouter.get("/create", AuthorizationGuard, PostController.newPostPage);
/** new post route */
PostRouter.post(
	"/create",
	AuthorizationGuard,
	FileUploader.array("images", 10),
	handleMulterImageSizeError,
	PostController.create
);
/** user posts route */
PostRouter.get("/my", AuthorizationGuard, PostController.findMyPosts);
/** post removal route */
PostRouter.delete("/delete/:id", AuthorizationGuard, PostController.remove);
/** single post route */
PostRouter.get("/single/:id", PostController.showPost);

module.exports = {
	PostRouter,
};
