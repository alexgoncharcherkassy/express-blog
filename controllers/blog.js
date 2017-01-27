'use strict';

const Blog = require('../models/Blog');

/**
 * GET /blog
 */
exports.getIndex = (req, res) => {
    Blog.find({owner: req.user.id}, (err, result, next) => {
        if (err) {
            return next(err);
        }
        res.render('blog/index', {
            blogs: result,
            title: 'Articles'
        });
    })
};
/**
 * GET /blog/:slug
 */
exports.getShowBlog = (req, res) => {
    const slug = req.params.slug;

    Blog.findOne({slug: slug}, (err, result, next) => {
        if (err) {
            return next(err);
        }
        res.render('blog/show', {
            post: result,
            title: 'Articles'
        });
    })
};
/**
 * GET /blog/new
 */

exports.getNewBlog = (req, res) => {
    res.render('blog/new', {
        title: 'Articles'
    });
};
/**
 * POST /blog/new
 */
exports.postNewBlog = (req, res) => {
    req.assert('title', 'Title cannot be blank').notEmpty();
    req.assert('bodyBlog', 'Text cannot be blank').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/blog/new');
    }

    const blog = new Blog({
        title: req.body.title,
        bodyBlog: req.body.bodyBlog,
        publishedAt: Date(),
        owner: req.user.id
    });

    blog.save((err) => {
        if (err) { return next(err); }
        req.flash('success', {msg: 'Article was created successfully.'});
        res.redirect('/blog');
    });
};
/**
 * GET /blog/edit
 */
exports.getUpdateBlog = (req, res, next) => {
    const slug = req.params.slug;
    Blog.findOne({slug: slug}, (err, blog) => {
        if (err) { return next(err); }
        if (blog.owner != req.user.id) {
            res.status(403).send();
            return;
        }
        res.render('blog/edit', {
            blog: blog,
            title: 'Articles'
        });
    });
};

/**
 * POST /blog/edit
 */
exports.postUpdateBlog = (req, res) => {
    const slug = req.params.slug;

    req.assert('title', 'Title cannot be blank').notEmpty();
    req.assert('bodyBlog', 'Text cannot be blank').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/blog/new');
    }

    Blog.findOne({slug: slug}, (err, blog) => {
        if (err) { return next(err); }
        blog.title = req.body.title;
        blog.bodyBlog = req.body.bodyBlog;

        blog.save((err) => {
            if (err) { return next(err); }
            req.flash('success', { msg: 'Article has been changed.' });
            res.redirect('/blog');
        });
    });
};
/**
 * POST /blog/delete
 * Delete user account.
 */
exports.postDeleteBlog = (req, res, next) => {
    const slug = req.params.slug;

    Blog.remove({ slug: slug }, (err) => {
        if (err) { return next(err); }
        req.flash('info', { msg: 'Article has been deleted.' });
        res.redirect('/blog');
    });
};

