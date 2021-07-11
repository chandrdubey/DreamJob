const router = require('express').Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/signup', authController.signup);
// router.post('/signin', usersController.signin);

module.exports = router;