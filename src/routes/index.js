const router = require('express').Router();
const authRoutes = require('./authRoutes');
const jobRoutes = require('./jobRoutes');
//const jobsRoutes = require('./jobsRoutes');


router.use('/', authRoutes);
router.use('/jobs', jobRoutes);
module.exports = router;