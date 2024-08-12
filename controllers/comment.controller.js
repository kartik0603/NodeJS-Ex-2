const Comment = require("../models/comment.schema");

const createComment = async (req, res) => {
  const { content, author, blogPost } = req.body;
  try {
    const newComment = new Comment({ content, author, blogPost });
    await newComment.save();
    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getCommentByPost = async (req, res) => {
  const { blogPostId } = req.params;
  try {
    const comments = await Comment.find({ blogPost: blogPostId }).populate(
      "author",
      "username"
    );
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const deleteComment =async (req,res)=>{

    const { id } = req.params;
    try {
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

};

module.exports={createComment,getCommentByPost,deleteComment}
