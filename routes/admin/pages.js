const express = require('express');
const router = express.Router();
const pages = require('../../controllers/admin/pages.controller')

/*
	get all posts to table
*/
router.route('/')
	.get(pages.getPagesWithOffset)

/*
	add, edit, delete article routes
*/
router.route('/new')
	.get(pages.showAddPage)
	.post(pages.addPage);

router.route('/edit')
	.get(pages.showEditPage)
	.put(pages.editPage);

router.delete('/delete', pages.deletePage);


module.exports = router;


/*
TODO:

  [] delele duplicate controllers
*/