const models = require("../models");

exports.main = (req, res, next) => {
	res.locals.user = req.user;
	Promise.all([
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
			return res.render("index")
		}).catch(err => {
			next(err);
		})
}

