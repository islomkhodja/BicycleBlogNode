const Posts = require('../models/').posts;
const chalk = require('chalk')


exports.getPostBySlug = async (req, res, next) => {
	Posts.getPostBySlug(req.params.slug)
		.then( post => res.render('article', { post }) )
		.catch(err => next(err))
}