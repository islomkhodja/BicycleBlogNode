const express = require('express');
const router = express();
const home =  require('../controllers/home.controller.js')


const chalk = require('chalk')

router
	.use('/', (req, res, next) => {
		res.locals.user = req.user;
		next();
	})
	.use(home.getTagAndCategory)
	.use('/', require('./home'))
	.use('/category', require('./categories'))
	.use('/tags', require('./tags'))
	.use('/article', require('./posts'))
	

module.exports = router;