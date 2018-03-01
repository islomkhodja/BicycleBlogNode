const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const models = require('./models');

const app = express();
/*
	Settings
 */
app.set('port', 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


/*
	Middlewares
 */
app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//- -- session middlewares
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
app.use(session({
	secret: "It's cat opposite of computer",
	store: new SequelizeStore({
		db: models.sequelize,
		checkExpirationInterval: 15 * 60 * 1000,
		expiration: 24 * 60 * 60 * 1000
	}),
	resave: false,
	saveUninitialized: true
}));

//- -- auth midllewares 
app.use(passport.initialize());
app.use(passport.session());

//- -- router middllewares
app.use('/', require('./routes/home'));
app.use('/admin', require('./routes/admin'))

//- error handler middlewares

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
})

app.use((err, req, res, next) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	res.status(err.status || 500);
	res.render('error');
})


module.exports = app;

