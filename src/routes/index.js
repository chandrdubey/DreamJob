const router = require('express').Router();
const userRoutes = require('./userRoutes');
const jobRoutes = require('./jobRoutes');
//const jobsRoutes = require('./jobsRoutes');


router.use('/', userRoutes);
router.use('/jobs', jobRoutes);
module.exports = router;