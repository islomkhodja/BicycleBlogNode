const express = require('express');
const router = express();
const users = require('../controllers/users.controller.js')
const chalk = require('chalk')


router.use((req, res, next) => {
	console.log("testsetset",req.user);
	res.locals.user = req.user;
	next();
})


router.get('/', users.isAuth, users.isAdmin, (req,res)=> {
  // console.log('dsadagfasdagasdasf',req.user);
  // res.locals.user_name = req.user.user_name
   res.render('admin/index'); //{ user_name: req.user.user_name }
});


router.
	route('/login')
	.get(users.isNotLogged,(req, res) => {
	  console.log('adminlogin')
	  res.render("admin/login");
	})
	.post(users.login);

//should be POST
router.get('/logout', users.logout);

router.route('/register',)
	.get(users.isNotLogged, (req, res) => {
	  res.render("admin/register");
	})
	.post(users.register)


// router.post('/register',  userController.register)

router.route('/article')
	.get((req, res, next) => {
		res.render('admin/article')
	})
	.post((req, res, next) => {

	})


router.get('/settings', (req,res)=> {
	console.log("SETTINGS ROUTE")
  console.log(chalk.red("USER DATA:"), req.user);
  res.render('admin/settings', { user_data: req.user });
});


module.exports = router;