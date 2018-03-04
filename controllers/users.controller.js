const Users = require('../models/').users;
const passport = require("passport");
const chalk = require('chalk')
exports.isAuth = (req, res, next) => {
	// debug('isAuth`ga keldi');
	console.log(chalk.yellow("path"), req.path);
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
	console.log(chalk.blue('REGISTER CONTROLLER:  '), req.body);

	let existUser = await Users.findOne({
		where: {
			user_email : req.body.email
		}
	});
	console.log("existUser:", existUser);
	if(existUser !== null) {
		return res.send("Such a user we have!");
	}

	let registerUser = {
		user_name : req.body.username,
		user_email : req.body.email,
		user_pass : req.body.password
	}

	let newUser = await Users.create(registerUser);

	console.log("A NEW USER:", newUser);

	res.redirect('/admin');
}

exports.login = async (req, res, next) => {
	console.log(chalk.blue("LOGIN CONTROLLER"), req.body);
	passport.authenticate('local', (err, user, info) => {
		if(err || !user) {
			console.log('info or error', info || err)
			res.send('INFO:' + info);
		} else {
			console.log("login user:", user);
			req.login(user, (err) => {
				if(err) {
					console.log(err);
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