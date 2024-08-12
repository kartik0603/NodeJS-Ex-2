const { Router } = require("express");

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/blog.controller");

const blogRouter = Router();

blogRouter.post("/", createPost);
blogRouter.get("/", getPost);

blogRouter.patch("/:id", updatePost);
blogRouter.delete("/:id", deletePost);

module.exports = blogRouter;
