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
	// 	attributes: [[models.sequelize.fn('GROUP_CONCAT', models.sequelize.col('term_slug')), 'tags_name'],[models.sequelize.fn('GROUP_CONCAT', models.sequelize.col('term_slug')), 'tags_slug']],
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

	// models.terms.findAll({
	// 	attributes: ['term_name', 'term_slug', 'term_count'],
	// 	where: {
	// 		term_type:'category'
	// 	}
	// }).then(data => {
	// 	console.log(chalk.yellow("category data length"), data.length);
	// 	data.forEach(obj => {
	// 		console.log(chalk.red("category data:"), obj.dataValues);
	// 	})

	// 	return models.terms.findAll({
	// 		attributes: ['term_name', 'term_slug', 'term_count'],
	// 		where : {
	// 			term_type: 'post_tag'
	// 		}
	// 	})
	// }).then(data => {
	// 	console.log(chalk.yellow("post_tag data length"), data.length);
	// 	data.forEach(obj => {
	// 		console.log(chalk.red("post_tag data:"), obj.dataValues);
	// 	})
	// })
	// 
	
	//doesn't work
	// models.terms.getAllTags().then(data => {
	// 	console.log(chalk.yellow("category data length"), data.length);
	// 	data.forEach(obj => {
	// 		console.log(chalk.red("category data:"), obj.dataValues);
	// 	})
	// })
	// 
	function a() {
		return models.terms.findAll({
				attributes: ['term_name', 'term_slug', 'term_count'],
				where: {
					term_type:'category'
				}
			})
	}

	function b() {
		return models.terms.findAll({
				attributes: ['term_name', 'term_slug', 'term_count'],
				where: {
					term_type:'post_tag'
				}
			})
	}
	Promise.all([
			models.terms.findAll({
				attributes: ['term_name', 'term_slug', 'term_count'],
				where: {
					term_type:'category'
				},
				raw: true
			}),
			models.terms.findAll({
				attributes: ['term_name', 'term_slug', 'term_count'],
				where: {
					term_type:'post_tag'
				},
				raw: true
			}),
		]).then(completed => {
			categories = completed[0];
			tags = completed[1];
			console.log( completed);
			categories.forEach(category => {
				console.log(category.dataValues);
			})

			tags.forEach(tag => {
				console.log(tag.dataValues);
			})
		})

}).catch(err => console.log("Connection Error:", err));