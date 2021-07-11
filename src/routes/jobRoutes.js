const router = require('express').Router();
const jobController = require('../controllers/jobController');
const passport = require('passport');

router.get('/all', jobController.alljobs);

module.exports = router;