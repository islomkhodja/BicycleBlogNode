const express = require('express');
const router = express.Router();
const users = require('../../controllers/users.controller');


router
	.route('/')
	.get(users.isNotLogged,(req, res) => {
	  console.log('adminlogin')
	  res.render("admin/login");
	})
	.post(users.login);

module.exports = router;