const express = require('express');
const router = express.Router();
const category = require('../../controllers/category.controller')
router.get('/', (req, res, next) => {
	res.redirect('/');
})
router.get('/:category', category.getPostsByCategoryWithOffset)	


module.exports = router;
