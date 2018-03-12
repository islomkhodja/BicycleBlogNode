const models = require('../../models');

exports.getCategories = (req, res, next) => {
	if(typeof req.query.edit !== "string") {
		models.terms.getAllCategory()
			.then(data => res.render('admin/posts/categories', {categories : data, edit: false}))
			.catch(err => next(err));	
	} else {
		models.terms.findOne({
			where: {
				term_slug: req.query.edit
			}
		}).then(data => {	
			res.render('admin/posts/categories', {category: data,edit: true})
		})
	}
}

exports.addCategory = (req, res, next) => {
	models.terms.create({
		term_type: "category",
		term_name: req.body.term_name,
		term_slug: req.body.term_slug
	}).then(data => {
		res.redirect(req.originalUrl);
	}).catch(err => next(err));
}

exports.deleteCategory = (req, res, next) => {
	models.terms.destroy({
		where: req.body,
		raw: true
	}).then(data => res.redirect(req.originalUrl))
	.catch(err => next(err));
}

exports.editCategory = (req, res, next) => {
	// res.json(req.body);
	models.terms.update({
		term_name: req.body.term_name,
		term_slug: req.body.term_slug,
	}, {
		where: {
			term_slug: req.body.term_slug
		}
	}).then(data => res.redirect(req.originalUrl))
	.catch(err => next(err))

}