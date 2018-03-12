const models = require("../models");
const chalk = require('chalk');
const postProcessing = require('./util/postProcessing');
exports.getTagAndCategory = (req, res, next) => {
	Promise.all([
			models.terms.getAllCategory(),
			models.terms.getAllTags(),
		]).then(completed => {
			categories = completed[0];
			tags = completed[1];
			res.locals.tags = tags;
			res.locals.categories = categories;
			next();
		}).catch(err => {
			return next(err);
		})
}

exports.getPostsWithOffset = async (req, res, next) => {
	let offset = 0;
	let limit  = 5;
	if(typeof req.query.page !== "undefined" && req.query.page !== null) {
		offset = req.query.page * limit;
	} else {
		req.query.page = 1;
	}
	try {
		let id = await models.posts.getOffsetPostsId(offset, limit);
		let _id = id.map(post => post.post_id);
		let data = await Promise.all([
			models.posts.getPostsById(_id),
			models.terms_relationship.getAllTermsByPostId(_id)
		])

		if(data) {
			let posts = data[0];
			let terms = data[1];
			let result = postProcessing(posts, terms);
			res.locals.posts = result;			
		}
		res.render("index", {page: parseInt(req.query.page)});

	} catch(err) { 
		return next(err);
	}
}



