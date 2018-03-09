const express = require("express");
const login    = require("express").Router();

login.route('/')
	.get((req, res, next) => {
		res.render()
	})
	.post((req, res, next) => {

	});



module.exports = login;

