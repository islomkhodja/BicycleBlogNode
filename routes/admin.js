const express = require('express');
const router = express();
const users = require('../controllers/users.controller.js')

router.get('/', users.isAuth, (req,res)=> {
  // console.log('dsadagfasdagasdasf',req.user);
  // res.locals.user_name = req.user.user_name
  res.render('admin/index'); //{ user_name: req.user.user_name }
});

router.get('/login', (req, res) => {
  console.log('adminlogin')
  res.render("admin/login");
});

router.post('/login', () => {

});

//should be POST
router.get('/logout', () => {

});

router.get('/register', (req, res) => {
  res.render("admin/register");
})


// router.post('/register',  userController.register)


router.get('/settings', (req,res)=> {
  res.render('admin/settings');
});


module.exports = router;