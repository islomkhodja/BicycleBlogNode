const express = require('express');
const router  = express.Router();

router.get('/article/:slug', (req, res, next) => {
	// if(article)
	res.send(req.query.slug);	
});

// router.post('/article/new')


router.get('/article/:url-slug', (req, res, next) => {

});




