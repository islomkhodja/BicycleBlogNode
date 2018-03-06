const models = require("../models");

exports.main = async (req, res, next) => {
	res.locals.user = req.user;
	await Promise.all([
			models.terms.findAll({
				attributes: ['term_name', 'term_slug', 'term_count'],
				where: {
					term_type:'category'
				},
				raw: true
			}),
			models.terms.findAll({
				attributes: ['term_name', 'term_slug'],
				where: {
					term_type:'post_tag'
				},
				raw: true
			}),
		]).then(completed => {
			categories = completed[0];
			tags = completed[1];
			
			res.locals.tags = tags;
			res.locals.categories = categories;
			// return res.render("index")
		}).catch(err => {
			return next(err);
		})

	await Promise.all([
			models.posts.findAll({
				order: [['post_id', 'DESC']],
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

				raw:true
			}),
			models.terms_relationship.findAll({
				include: [
					{
						// attributes: ['user_name', 'user_type'],
						model: models.terms,
					}
				], 
				raw: true
			})
	]).then((data) => {
		// console.log(data);
		var posts = data[0];
		var terms = data[1];
		var result = posts.map((post) => {
 	
			post.tags = terms.filter((tag) => {
				if(tag["postPostId"] === post["post_id"] && tag["term.term_type"] === "post_tag") {
					return tag;
				}
			})

			post.categories = terms.filter((tag) => {
				if(tag["postPostId"] === post["post_id"] && tag["term.term_type"] === "category") {
					return tag;
				}
			});

			return post
		})

		res.locals.posts = result;
		// console.log(chalk.green("result"), result);

	})

	return res.render("index");
}

