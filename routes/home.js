const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.locals.user = req.user;
	return res.render("index");
}) 

module.exports = router;