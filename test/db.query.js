var models = require('../models');
var chalk = require('chalk')
models.sequelize.sync().then(function() {
  // console.log(models)
/*  SELECT GROUP_CONCAT(terms.term_slug) as tags 
	FROM `terms_relationships` 
	inner join terms on terms.term_id = terms_relationships.termTermId 
	where terms.term_type = 'post_tag' and terms_relationships.postPostId = 1 */

	/*
	SELECT GROUP_CONCAT(terms.term_slug) as tags 
	FROM `terms_relationships`, `terms` 
	WHERE terms.term_id = terms_relationships.termTermId 
	and terms.term_type = 'post_tag' and terms_relationships.postPostId = 1
	 */
	

	// models.terms_relationship.findOne({
		// attributes: [[models.sequelize.fn('GROUP_CONCAT', models.sequelize.col('term_slug')), 'tags_name'],[models.sequelize.fn('GROUP_CONCAT', models.sequelize.col('term_slug')), 'tags_slug']],
	// 	where : {
	// 		postPostId: 1
	// 	},
	// 	include: [{
	// 		model: models.terms, where: { term_type: 'post_tag' },
	// 	}],
	// }).then(result => {
	// 	console.log(result.dataValues)
	// 	// console.log(arguments);
	// }).catch(err => console.log("findOne Error:", err));
	


	//*HOME

	// models.posts.findAll({
	// 	order: ['post_created_time', 'DESC'],
	// 	where: {
	// 		post_type: 'post',
	// 		post_status: 'publish'
	// 	},
	// 	include: [{
	// 			model: models.terms_relationship,
	// 			include: [ models.terms] 
	// 	}]
	// })
	// .then(data => {
	// 	console.log(data);
	// })

	// Promise.all([
	// 		models.posts.findAll({
	// 			order: [['post_id', 'DESC']],
	// 			where: {	
	// 				"post_type": "post",
	// 				"post_status": "publish"
	// 			},
	// 			include : [
	// 					{
	// 						attributes: ['user_name', 'user_type'],
	// 						model: models.users,
	// 					}
	// 				],

	// 			raw:true
	// 		}),
	// 		models.terms_relationship.findAll({
	// 			include: [
	// 				{
	// 					// attributes: ['user_name', 'user_type'],
	// 					model: models.terms,
	// 				}
	// 			], 
	// 			raw: true
	// 		})
	// ]).then((data) => {
	// 	// console.log(data);
	// 	var posts = data[0];
	// 	var terms = data[1];
	// 	var result = posts.map((post) => {
 	
	// 		post.tags = terms.filter((tag) => {
	// 			if(tag["postPostId"] === post["post_id"] && tag["term.term_type"] === "post_tag") {
	// 				return tag;
	// 			}
	// 		})

	// 		post.categories = terms.filter((tag) => {
	// 			if(tag["postPostId"] === post["post_id"] && tag["term.term_type"] === "category") {
	// 				return tag;
	// 			}
	// 		});

	// 		return post
	// 	})


	// 	console.log(chalk.green("result"), result);

	// })

	// with offset and limit
	// models.posts.findAll({ 
	// 		offset: 0, limit: 5,
	// 		where: {	
	// 				"post_type": "post",
	// 				"post_status": "publish",
	// 			},
	// 		attributes: ['post_id'],
	// 		raw:true
	// 	}).then(data => console.log(data.map(obj => obj.post_id)));

	// GET POSTS WITH SUBSTRING
	/* models.posts.findAll({
		raw: true,
		attributes: ['post_id', 'post_title', [models.sequelize.fn('SUBSTRING', models.sequelize.col('post_content'), 1, 150),'post_content'], 'url_slug', 'comment_status', 'comment_count', 'userUserId'],
		where: {	
					"post_type": "post",
					"post_status": "publish"
				},
		include : [
				{
					attributes: ['user_name', 'user_type'],
					model: models.users,
				}
			],
	}).then(data => console.log(data)) */

	// models.terms_relationship.findAll({
	// 	attributes: ['postPostId'],
	// 	include : [
	// 		{

	// 			model: models.terms,
	// 			where: {
	// 				term_type : 'post_tag',
	// 				term_slug : 'css'	
	// 			},
	// 		}
	// 	],
		
	// 	raw: true
	// })
	// .then(data => console.log(data))

	//models.posts.getPostBySlug('lorem-woarld').then(data => console.log(data)).catch(err => console.log(err))


}).catch(err => console.log("Connection Error:", err));