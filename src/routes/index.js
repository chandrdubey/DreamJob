const router = require('express').Router();
const authRoutes = require('./authRoutes');
//const jobsRoutes = require('./jobsRoutes');


router.use('/', authRoutes);
//router.use('/jobs', jobsRoutes);
module.exports = router;