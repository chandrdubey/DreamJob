const router = require('express').Router();
const jobController = require('../controllers/jobController');
const passport = require('passport');
router.get('/all', jobController.allJobs);
router.post('/new', passport.authenticate('jwt', { session: false }),jobController.newJob);
router.get('/search/:query',  jobController.searchJobs);

module.exports = router;