const models = require('../../models');

exports.routePages = async (req, res, next) => {
	let path = req.path;

	let usedRoutes = ['/admin', '/tags', '/article', '/search'];
	let check = usedRoutes.every((route) => {
		if(route === path) 
			return false
		else 
			return true
	})

	if(!check) return next();
	
	let searchPage = await models.posts.findOne({
		where: {
			post_status: 'publish',
			post_type: 'page',
			url_slug: path.slice(1)
		},
		raw: true
	})

	if(searchPage === null) {
		return next();
	}
	console.log(searchPage);

	res.render('page', {page: searchPage});
}