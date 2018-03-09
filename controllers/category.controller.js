const models = require('../models');
const chalk = require('chalk');
const postProcessing = require('./util/postProcessing');



exports.getPostsByCategoryWithOffset = async (req, res, next) => {
	let offset = 0;
	let limit  = 5;
	// console.log(yellow("page"), req.query.page)
	if(typeof req.query.page !== "undefined" && req.query.page !== null) {
		offset = req.query.page * limit;
	} else {
		req.query.page = 1;
	}
	let id = ""
	try {
		id = await models.terms_relationship.getAllPostsIdByCategory(req.params.category, offset, limit);
	} catch(err) {
		return next(err);
	}
	console.log(id);
	let _id = id.map(post => post.postPostId);

	await Promise.all([
		models.posts.getPostsById(_id),
		models.terms_relationship.getAllTermsByPostId(_id)
	]).then((data) => {
		if(data) {
			let posts = data[0];
			let terms = data[1];
			let result = postProcessing(posts, terms);

			res.locals.posts = result;			
		}
		return res.render("category", { 
			category: req.params.category,
			page: parseInt(req.query.page)
		});
	}).catch(err => {
		return next(err);
	})
}