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
	.use('/', require('./main/home'))
	.use('/category', require('./main/categories'))
	.use('/tags', require('./main/tags'))
	.use('/article', require('./main/posts'))
	

module.exports = router;