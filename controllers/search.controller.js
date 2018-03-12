const models = require('../models');
const chalk = require('chalk');
const postProcessing = require('./util/postProcessing');
const Op = models.Sequelize.Op;

// FROM posts 
// WHERE 1=1 
// AND (((posts.post_title LIKE '%тиест%')
// OR (posts.post_excerpt LIKE '%тиест%')
// OR (posts.post_content LIKE '%тиест%'))) 
// AND posts.post_type IN ('post', 'page', 'attachment')
// AND (posts.post_status = 'publish'
// OR posts.post_author = 1
// AND posts.post_status = 'private') 
// ORDER BY posts.post_title LIKE '%тиест%' DESC, wp_posts.post_date DESC
// LIMIT 0, 10

exports.search = async (req, res, next) => {
	let search_term = req.query.s;

	try {
		let posts_id = await models.posts.findAll({
			attributes: ['post_id'],
			where: {
			  [Op.or]: [
			    {
			      post_title: {
			        [Op.like]: "%" + search_term + "%"
			      }
			    },
			    {
			      post_content: {
			        [Op.like]: "%" + search_term + "%"
			      }
			    },
			  ],
			  post_type: ['post', 'page'],
			  post_status: 'publish'
			},
			raw: true
		});

		let _id = posts_id.map(post => post.post_id);
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
		res.render("search", {search: search_term});
	} catch (err) {
		next(err);
	}

}