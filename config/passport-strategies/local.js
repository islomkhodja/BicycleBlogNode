const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var Users = require('../../models').users;
var md5 = require('md5');

module.exports = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password'
}, async (email, password, done) => {
	try {
		let user = await Users.findOne({ where: { user_email : email } });
		
		if(!user) {
			return done(null, false, {
				message: "Unknown user"
			});
		}

		if(user.user_pass !== md5(password)) {
			return done(null, false, {
				message: 'Invalid password'
			})
		}

		done(null, user);
	} catch(err) {
		console.log(err);
	}
})