const Terms = require('../models').terms
const chalk = require('chalk');

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