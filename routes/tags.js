const express = require('express');
const router = express.Router();
const tags = require('../controllers/tags.controller')
router.get('/', (req, res, next) => {
	res.redirect('/');
})
router.get('/:tag', tags.getPostsByTagWithOffset)	


module.exports = router;
