const Blog = require('../models/Blog');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
    Blog.find({}, (err, result, next) => {
        if (err) {
            return next(err);
        }
        res.render('home', {
            blogs: result
        });
    })
};
