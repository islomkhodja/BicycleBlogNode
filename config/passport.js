const user = require('./models').users;
const local = require('./passport-strategies/local');
const google = require('./passport-strategies/google');
const facebook = require('./passport-strategies/facebook');
const twitter = require('./passport-strategies/twitter');
const linkedin = require('./passport-strategies/linkedin');
const github = require('./passport-strategies/github');


// use these strategies
passport.use(local);
/*passport.use(google);
passport.use(facebook);
passport.use(twitter);
passport.use(linkedin);
passport.use(github); */

  // serialize sessions
passport.serializeUser((user, done) => {
  console.log('passport.js: serializeUser => ', user);

  done(null, user.user_id);
})

passport.deserializeUser( async (user_id, done) => {
  console.log('passport.js: deserializeUser =>', user_id);
  try {
    let User = await Users.findById(user_id)
    done(null, user);
  } catch(err) {
    done(err)
  } 
})

module.exports = passport;
