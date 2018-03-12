const express = require('express');
const router = express.Router();
const users = require('../../controllers/users.controller');
const posts = require('../../controllers/admin/posts.controller')
const category = require('../../controllers/admin/category.controller')
const tag = require('../../controllers/admin/tags.controller')

/*
	get all posts to table
*/
router.route('/')
	.get(posts.getPostsWithOffset)

/*
	add, edit, delete article routes
*/
router.route('/new')
	.get(posts.showAddPost)
	.post(posts.addPost);

router.route('/edit')
	.get(posts.showEditPost)
	.put(posts.editPost);

router.delete('/delete', posts.deletePost);

/*
	categories
*/
router.route('/categories')
	.get(category.getCategories)
	.post(category.addCategory)
	.put(category.editCategory)
	.delete(category.deleteCategory)

/*
	tags
*/
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