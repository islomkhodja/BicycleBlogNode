const Users = require('../models/').users;
const passport = require("passport");
const chalk = require('chalk')
exports.isAuth = (req, res, next) => {
	// debug('isAuth`ga keldi');
	if(req.path === "/login" || req.path === "/register") {
	  return next();
	}
	req.isAuthenticated()
		? next()
		: res.redirect('/admin/login')
}

exports.isAdmin = (req, res, next) => {
	if(req.user.user_type === "admin") {
		return next();
	}

	res.send('It`s not your location');
}

exports.isNotLogged = (req, res, next) => {
	// debug('isNotLogged`ga keldi')
	req.isAuthenticated()
		? res.redirect('/admin/')
		: next()
}




exports.register = async (req, res, next) => {

	let existUser = await Users.findOne({
		where: {
			user_email : req.body.email
		}
	});
	if(existUser !== null) {
		return res.send("Such a user we have!");
	}

	let registerUser = {
		user_name : req.body.username,
		user_email : req.body.email,
		user_pass : req.body.password
	}

	let newUser = await Users.create(registerUser);


	res.redirect('/admin');
}

exports.login = async (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(err || !user) {
			res.send('INFO:' + JSON.stringify(info));
		} else {
			req.login(user, (err) => {
				if(err) {
					res.send(err);
				} else {
					res.redirect("/admin")
				}
			})
		}
	}) (req, res, next)
}


exports.logout = (req, res, next) => {
	req.logout();
	res.redirect('/');
}