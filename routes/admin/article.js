const express = require('express');
const router = express.Router();
const users = require('../../controllers/users.controller');
const posts = require('../../controllers/admin/posts.controller')

router.route('/')
	.get(posts.getPostsWithOffset)
	.post((req, res, next) => {

	})

router.get('/new', (req, res, next) => {
	res.render('admin/posts/article')
})

module.exports = router;