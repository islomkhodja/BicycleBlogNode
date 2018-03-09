const express = require('express');
const router = express.Router();
const users = require('../../controllers/users.controller');


router.route('/')
	.get(users.isNotLogged, (req, res) => {
		res.render("admin/register");
	})
	.post(users.register)

module.exports = router;