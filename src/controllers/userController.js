const pool = require("../config/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  config  = require('../config/index');

const JWT_SECRET = config.JWT_SECRET;
module.exports = {
    signup: async (req, res) => {
        try {
            const {userType} = req.body;
            console.log(req.body);
            if (userType === undefined) {
                return res.json({status: 404, message: "Type of user is missing"});
            }
          //  console.log(1);
            // if type equal to zero , user is jobseeker
            if (userType === false) {
           //     console.log(2);
                const {
                    name,
                    password,
                    confirm_password,
                    email,
                    city,
                    mobile_number
                } = req.body

           //     console.log(name);
                // Checking if email present in the database or not
                const result = await pool.query("SELECT * FROM jobseekers where email=$1", [email]);

                if (result.rows.length > 0) { // If it is present , return status 404 with messeage
                    return res.json({status: 400, message: "Email alredy exist"});
                } else {
                    // If it is not,  detalis of the user will be stored in database with hashed password
                    // creating hash of password
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    // console.log(hashPassword);
                    const result = await pool.query("INSERT INTO jobseekers (name, email, password, city, mobile_number) VALUES ($1, $2 ,$3, $4, $5) RETURNING*", [
                        name,
                        email,
                        hashPassword,
                        city,
                        mobile_number
                    ]);
                    // console.log(JWT_SECRET);
                    // Creating JWT token using user's id
                    const token = jwt.sign({
                        id: result.rows[0].user_id,
                        userType: userType
                    }, JWT_SECRET, {expiresIn: "2d"});
                    res.json({
                        status:200,
                        token,
                        data: {
                            user_detail: {
                                user_id: result.rows[0].user_id,
                                email: result.rows[0].email,
                                name: result.rows[0].name,
                                city: result.rows[0].city,
                                mobile_number: result.rows[0].mobile_number
                            },
                            userType: userType
                        }
                    });
                }
            } else {
                const {
                    name,
                    password,
                    confirm_password,
                    email,
                    company_name
                } = req.body
              //  console.log(3);
                // Checking if email present in the database or not
                const result = await pool.query("SELECT * FROM recruiters WHERE email=$1", [email]);
            //    console.log(4);
                if (result.rows.length > 0) { // If it is present , return status 404 with messeage
                    return res.json({status: 400, message: "Email alredy exist"});
                } else {
                    // If it is not,  detalis of the user will be stored in database with hashed password
                    // creating hash of password
            //        console.log(5);
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    // console.log(hashPassword);
                    const result = await pool.query("INSERT INTO recruiters (name, email, password, company_name) VALUES($1, $2 ,$3, $4) RETURNING*", [name, email, hashPassword, company_name]);
                    // console.log(JWT_SECRET);
                    // Creating JWT token using user's id
                    const token = jwt.sign({
                        id: result.rows[0].recruiter_id,
                        userType: userType
                    }, JWT_SECRET, {expiresIn: "2d"});
                    res.json({
                        status:200,
                        token,
                        data: {
                            user_detail: {
                                user_id: result.rows[0].user_id,
                                email: result.rows[0].email,
                                name: result.rows[0].name,
                                compnay_name: result.rows[0].compnay_name
                            },
                            userType: userType
                        }
                    });
                }
            }
        } catch (err) {
            return res.json({status: 404, message: err});
        }
    },
    signin : async (req, res) => {
        try {
            const {userType} = req.body;
            if (userType === undefined) {
                return res.json({status: 400, message: "Type of user is missing"});
            }
            // if type equal to zero , user is jobseeker
            if (userType === false) {

                const {password, email} = req.body

                // Checking if email present in the database or not
                const result = await pool.query("SELECT * FROM jobseekers where email=$1", [email]);
                if (result.rows.length === 0) { // If it is not present , return status 404 with messeage
                    return res.json({status: 400, message: "Email does not exist"});
                } else { // checking password
                    const validPassword = await bcrypt.compare(password, result.rows[0].password);
                    if (! validPassword) {
                        console.log("Wrong password");
                        return res.json({status: 400,message: "Wrong password"});
                    }
                    // console.log(JWT_SECRET);
                    // Creating JWT token using user's id
                    const token = jwt.sign({
                        id: result.rows[0].user_id,
                        userType: userType
                    }, JWT_SECRET, {expiresIn: "2d"});
                    res.json({
                        status: 200,
                        token,
                        data: {
                            user_detail: {
                                user_id: result.rows[0].user_id,
                                email: result.rows[0].email,
                                name: result.rows[0].name,
                                city: result.rows[0].city,
                                mobile_number: result.rows[0].mobile_number
                            },
                            userType: userType
                        }
                    });
                }
            } else {
                const {password, email} = req.body
                // Checking if email present in the database or not
                const result = await pool.query("SELECT * FROM recruiters where email=$1", [email]);
                if (result.rows.length === 0) { // If it is not present , return status 404 with messeage
                    return res.json({status: 400, message: "Email does not exist"});
                } else { // checking password
                    const validPassword = await bcrypt.compare(password, result.rows[0].password);
                    if (! validPassword) {
                        console.log("Wrong password");
                        return res.status(400).json({message: "Wrong password"});
                    }
                    // Creating JWT token using user's id
                    const token = jwt.sign({
                        id: result.rows[0].recruiter_id,
                        userType: userType
                    }, JWT_SECRET, {expiresIn: "2d"});
                    res.json({
                        status: 200,
                        token,
                        data: {
                            user_detail: {
                                user_id: result.rows[0].recruiter_id,
                                email: result.rows[0].email,
                                name: result.rows[0].name,
                                company_name: result.rows[0].company_name
                            },
                            userType: userType,
                        }
                    });
                }
            }
        } catch (err) {
            return res.json({status: 404, message: err});
        }
    },
    recruiterAllJobs: async (req, res) => {
        try{
            const {id} = req.params;
         
            const result = await pool.query("SELECT * FROM jobs WHERE recruiter_id = $1",[id]);
         
            res.json({status:200, result:result.rows});
        }
        catch (err) {
            return res.json({status: 404, message: err});
        }
    },
    applyJob: async (req, res) => {
        try{
            const {user_id, job_id} = req.body;
            const result = await pool.query("INSERT INTO applications (user_id, job_id) VALUES ($1, $2) RETURNING*", [user_id, job_id]);
            res.json({status:200, message:"Application added successfully"});
        }
        catch (err) {
            return res.json({status: 404, message: err});
        }
    },
    jobAllCandidates: async (req, res)=>{
        try{
            const {jobId} = req.params;
          
            const result = await pool.query("SELECT s.user_id, s.name, s.email, s.city, s.created_at, s.mobile_number, appli.application_id from jobseekers as s inner join applications as appli on appli.user_id = s.user_id where appli.job_id = $1",[jobId])
            res.json({status:200, result:result.rows});
        }
        catch (err) {
            return res.json({status: 404, message: err});
        }
    }
}
