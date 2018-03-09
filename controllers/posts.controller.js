const Posts = require('../models/').posts;
const chalk = require('chalk')


exports.getPostBySlug = async (req, res, next) => {
	Posts.getPostBySlug(req.params.slug)
		.then(post => {
			res.render('article', { post });
		})
		.catch(err => {
			console.log(err);
			next(err);
		})

	// await Promise.all([
	// 	models.posts.getPostsBySlug(url_slug),
	// 	models.terms_relationship.getAllTermsByPostId(_id)
	// ]).then((data) => {
	// 	if(data) {
	// 		let posts = data[0];
	// 		let terms = data[1];
	// 		let result = postProcessing(posts, terms);

	// 		res.locals.posts = result;			
	// 	}
	// 	return res.render("article");
	// }).catch(err => {
	// 	return next(err);
	// })
}