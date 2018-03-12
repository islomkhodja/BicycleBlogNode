const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const models = require('./models');
const compression = require('compression')
const methodOverride = require('method-override');

const app = express();
/*
	Settings
 */
app.set('port', 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());

/*
	Middlewares
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(function (req) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

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
app.get('/testform', (req, res, next) => {
	res.send(`
<!DOCTYPE html>
<html>
<body>

<form action="/testform" method="post">
<input type="checkbox" name="category[0]" value="Bike">I have a bike
<br>
<input type="checkbox" name="category[1]" value="Car">I have a car 
<br>
<input type="checkbox" name="category[2]" value="Boat">I have a boat
<br>
<input type="submit">
</form> 

</body>
</html>
		`)
})

app
	.post('/testform', (req, res, next) => {
		res.json(req.body);
	});
app
	.use('/admin', require('./controllers/users.controller').isAuth, require('./routes/admin'));

app
	.use('/', require('./routes/main'));





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

