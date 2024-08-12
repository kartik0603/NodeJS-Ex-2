const { Router } = require("express");
const {createComment,getCommentByPost,deleteComment} = require("../controllers/comment.controller");

const commentRouter = Router();


commentRouter.post('/', createComment);
commentRouter.get('/:blogPostId', getCommentByPost);
commentRouter.delete('/:id', deleteComment);

module.exports= commentRouter;