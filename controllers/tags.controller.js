const models = require('../models');
const chalk = require('chalk');
const postProcessing = require('./util/postProcessing');


exports.getTagsForEditArticle = (req, res, next) => {
	let article = {};
    /*
	SELECT GROUP_CONCAT(terms.term_slug) as tags 
	FROM `terms_relationships` 
	inner join terms on terms.term_id = terms_relationships.termTermId 
	where terms.term_type = 'post_tag' and terms_relationships.postPostId = 1
	*/

	// secondd variant
	/*
	SELECT GROUP_CONCAT(terms.term_slug) as tags 
	FROM `terms_relationships`, `terms` 
	WHERE terms.term_id = terms_relationships.termTermId 
	and terms.term_type = 'post_tag' and terms_relationships.postPostId = 1
	*/
}

exports.getPostsByTagWithOffset = async (req, res, next) => {
	let offset = 0;
	let limit  = 5;

	if(typeof req.query.page !== "undefined" && req.query.page !== null) {
		offset = req.query.page * limit;
	} else {
		req.query.page = 1;
	}
	let id = ""
	try {
		id = await models.terms_relationship.getAllPostsIdByTags(req.params.tag, offset, limit);
	
		let _id = id.map(post => post.postPostId);

		const data = await Promise.all([
			models.posts.getPostsById(_id),
			models.terms_relationship.getAllTermsByPostId(_id)
		]);

		if(data) {
			let posts = data[0];
			let terms = data[1];
			let result = postProcessing(posts, terms);

			res.locals.posts = result;			
		}
		return res.render("tags", { 
			tag: req.params.tag,
			page: parseInt(req.query.page)
		});
	} catch(err) {
		return next(err);
	}
}