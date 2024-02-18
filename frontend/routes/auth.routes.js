// to implement express
const express = require('express');

const authController = require('../controllers/auth.controller');
//add express router
const router = express.Router();
//using router created at line 4 for serving sign up page
router.get('/signup', authController.getSignup);

router.get('/login', authController.getLogin);



module.exports = router;