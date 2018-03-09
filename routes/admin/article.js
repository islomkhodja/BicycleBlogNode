const express = require('express');
const router = express.Router();
const users = require('../../controllers/users.controller');
const posts = require('../../controllers/admin/posts.controller')
const category = require('../../controllers/admin/category.controller')
const tag = require('../../controllers/admin/tags.controller')


router.route('/')
	.get(posts.getPostsWithOffset)
	.post((req, res, next) => {

	})

router.get('/new', (req, res, next) => {
	res.render('admin/posts/article')
})


router.route('/categories')
	.get(category.getCategories)
	.post(category.addCategory)
	.put(category.editCategory)
	.delete(category.deleteCategory)

router.route('/tags')
	.get(tag.getTags)
	.post(tag.addTag)
	.put(tag.editTag)
	.delete(tag.deleteTag)

module.exports = router;


/*
TODO:

  [] delele duplicate controllers
*/