const models = require('../../models/');
const chalk = require('chalk')
const postProcessing = require('../util/postProcessing');

exports.getPostBySlug = async (req, res, next) => {
	
}

exports.getPostsWithOffset = async (req, res, next) => {
	let offset = 0;
	let limit  = 5;
	// console.log(yellow("page"), req.query.page)
	if(typeof req.query.page !== "undefined" && req.query.page !== null) {
		offset = req.query.page * limit;
	} else {
		req.query.page = 1;
	}
	console.log(chalk.red("offset and limit"), offset, limit);

	let id = await models.posts.getOffsetPostsId(offset, limit);
	let _id = id.map(post => post.post_id);
	await Promise.all([
		models.posts.getPostsById(_id),
		models.terms_relationship.getAllTermsByPostId(_id)
	]).then((data) => {
		if(data) {
			let posts = data[0];
			let terms = data[1];
			let result = postProcessing(posts, terms);
			console.log(result);
			res.locals.posts = result;			
		}
		return res.render("admin/posts/all", {page: parseInt(req.query.page)});
	}).catch(err => {
		return next(err);
	})
}
