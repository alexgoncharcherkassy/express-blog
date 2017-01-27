const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const blogSchema = new mongoose.Schema({
    title: String,
    bodyBlog: String,
    publishedAt: Date,
    owner: String
}, { timestamps: true });

blogSchema.plugin(URLSlugs('title'));

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;