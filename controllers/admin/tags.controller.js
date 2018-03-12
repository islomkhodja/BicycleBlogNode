const models = require('../../models');

exports.getTags = (req, res, next) => {
	if(typeof req.query.edit !== "string") {
		models.terms.getAllTags()
			.then(data => res.render('admin/posts/tags', {tags : data, edit: false}))
			.catch(err => next(err));	
	} else {
		models.terms.findOne({
			where: {
				term_slug: req.query.edit
			}
		}).then(data => {	
			res.render('admin/posts/tags', {tag: data,edit: true})
		})
	}
}

exports.addTag = (req, res, next) => {
	models.terms.create({
		term_type: "post_tag",
		term_name: req.body.term_name,
		term_slug: req.body.term_slug
	}).then(data => {
		res.redirect(req.originalUrl);
	}).catch(err => next(err));
}

exports.deleteTag = (req, res, next) => {
	models.terms.destroy({
		where: req.body,
		raw: true
	}).then(data => res.redirect(req.originalUrl))
	.catch(err => next(err));
}

exports.editTag = (req, res, next) => {
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