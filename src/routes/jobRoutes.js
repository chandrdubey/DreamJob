const router = require('express').Router();
const jobController = require('../controllers/jobController');
const passport = require('passport');

router.get('/all', jobController.allJobs);
router.post('/new', jobController.newJob);

module.exports = router;