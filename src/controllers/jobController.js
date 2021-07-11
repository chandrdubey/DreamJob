const pool = require('../config/pg');

module.exports = {
    allJobs: (req, res) => {
        try{
            pool.query('SELECT * FROM jobs ORDER BY created_at DESC').then(result => res.json({status: 200, data: result.rows})).catch(err => {
                res.json({status: 500, message: err});
            })
        }
        catch(err){
            res.json({status: 500, message: err});
        }
       
    },
    newJob: (req, res) => {
        try{
            const {
                title,
                description,
                company_name,
                city,
                recruiter_id
            } = req.body;
            const result = pool.query("INSERT INTO jobs (title, description, company_name, city, recruiter_id) VALUES ($1, $2 ,$3, $4, $5) RETURNING*",
            [title, description, company_name, city, recruiter_id])
            .then(()=> res.json({status:200, message:"new job added successfully"}))
        }
        catch (err){
            res.json({status: 500, message: err});
        }
    }

}
