const user = require('../models/').users;

exports.isAuth = (req, res, next) => {
	debug('isAuth`ga keldi');
	req.isAuthenticated()
		? next()
		: res.redirect('/admin/login')
}

exports.isNotLogged = (req, res, next) => {
	debug('isNotLogged`ga keldi')

	req.isAuthenticated()
		? res.redirect('/admin/')
		: next()
}