const Posts = require('../models/').posts;
const chalk = require('chalk')


exports.getPostBySlug = async (req, res, next) => {
	try {
		const post = await Posts.getPostBySlug(req.params.slug);

		return res.render('article', { post }); 
	} catch(err) {
		return next(err)
	}
}

