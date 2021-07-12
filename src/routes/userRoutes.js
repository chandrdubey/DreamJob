const router = require('express').Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/recruiters/:id/jobs', userController.recruiterAllJobs);
router.get('/recruiters/:id/jobs/:jobId', userController.jobAllCandidates)
router.post('/candidates/jobs/apply', userController.applyJob);

module.exports = router;