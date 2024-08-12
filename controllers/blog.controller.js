const BlogPost = require("../models/blogPost.schema"); // Ensure consistent naming

const createPost = async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const newPost = new BlogPost({ title, content, author });
        await newPost.save();
        res.status(201).json({ message: "Blog post created successfully", post: newPost });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getPost = async (req, res) => {
    try {
        const posts = await BlogPost.find().populate("author", "username");
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const post = await BlogPost.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await BlogPost.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createPost, getPost, updatePost, deletePost };
