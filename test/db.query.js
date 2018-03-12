var models = require('../models');
var chalk = require('chalk')
models.sequelize.sync().then(async function() {
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

// {
// "category": [
// "backend"
// ],
//	"heading" : "test",
// "tags": "test, best",
// "url_slug": "dunyo-xabar",
// "date_time": "2017-10-30T11:58",
// "content": "<p>Here goes the initial content of the editor.</p>",
// "comments": "open",
// "status": "publish"
// }


	// models.posts.create({
	// 	post_title: "test",
	// 	post_content: "<p>Here goes the initial content of the editor.</p>",
	// 	url_slug:"dunyo-xabar",
	// 	post_type: "post",
	// 	post_status: "publish",
	// 	post_created_time: "2017-10-30T11:58",
	// 	post_modified_time: "2017-10-30T11:58",
	// 	comment_status: "close",
	// 	userUserId: 1
	// })

	// models.terms.findOne({
	// 	where: {
	// 		term_slug: "backend"
	// 	},
	// 	// include: [models.terms],
	// 	raw: true,
	// })
	// .then(data => {
	// 	console.log(data);

	// 	return models.terms_relationship.create({
	// 		postPostId: 5,
	// 		termTermId: data.term_id,
	// 		raw:true
	// 	})
	// })
	// .then(data => {
	// 	console.log(data);


	// })
	// .catch(err => {
	// 	console.log(err);
	// })
	
	// models.terms.findOrCreate({
	// 		where: {
	// 			term_slug: 'cpp',
	// 			term_type: "post_tag"
	// 		},
	// 		defaults: {
	// 			term_name: "cpp"
	// 		}
	// 	}).then(data => console.log(data))
	// 	.catch(err => console.log(err))
	


	let tags = ["html","css", "cpp", "qanday", "yaxshi"];
	const parallel = tags.map(tag => {
		return models.terms.findOrCreate({
			where: {
				term_slug: tag,
				term_type: "post_tag"
			},
			defaults: {
				term_name: tag
			}
		})	
	})

	let doneTask = await Promise.all(parallel);
	doneTask.forEach(async task => {
		console.log(task[0].get({
	      plain: true
	    }))
    	console.log(task[1])	    
	})	

	let tr = doneTask.map(task => {
		tag = task[0];

		return models.terms_relationship.create({
			postPostId: 5, 
			termTermId: tag.term_id, raw: true
		})
	})

	let result = await Promise.all(tr);
	console.log(result)	
	

}).catch(err => console.log("Connection Error:", err));

async function processArray(array) {
	const promises = array.map()
}