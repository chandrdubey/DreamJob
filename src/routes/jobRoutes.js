const router = require('express').Router();
const jobController = require('../controllers/jobController');


router.get('/all', jobController.allJobs);
router.post('/new', jobController.newJob);
router.get('search/:query', jobController.searchJobs);

module.exports = router;