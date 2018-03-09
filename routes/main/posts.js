const express = require('express');
const router  = express.Router();
const posts = require('../../controllers/posts.controller.js')
router.get('/:slug', posts.getPostBySlug);

// router.post('/article/new')


// router.get('/article/:url-slug', (req, res, next) => {

// });

module.exports = router;


