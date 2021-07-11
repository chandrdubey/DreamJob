const pool = require('../config/pg');

module.exports ={
    alljobs : (req, res)=>{
         pool.query('SELECT * FROM jobs ORDER BY created_at DESC')
         .then(result=> res.json({status:200, data:result.rows}))
         .catch(err=>{
             res.json({status:500, message:err});
         })
    },
    
}