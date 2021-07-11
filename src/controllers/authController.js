const pool = require('../config/pg');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "naukri";
module.exports = {
    signup: async (req, res) => {
        try {
            const {userType} = req.body;
            if (!userType) {
                return res.json({status: 404, message: "Type of user is missing"});
            }
            // if type equal to zero , user is jobseeker
            if (userType === 0) {

                const {
                    name,
                    password,
                    confirm_password,
                    email,
                    city,
                    mobile_number
                } = req.body
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
                        id: result.rows[0].user_id
                    }, secret, {expiresIn: "2d"});
                    res.status(200).json({
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
                // Checking if email present in the database or not
                const result = await pool.query("SELECT * FROM recruiters where email=$1", [email]);
                if (result.rows.length > 0) { // If it is present , return status 404 with messeage
                    return res.json({status: 400, message: "Email alredy exist"});
                } else {
                    // If it is not,  detalis of the user will be stored in database with hashed password
                    // creating hash of password
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    // console.log(hashPassword);
                    const result = await pool.query("INSERT INTO jobseekers (name, email, password, compnay_name) VALUES ($1, $2 ,$3, $4) RETURNING*", [name, email, hashPassword, company_name]);
                    // console.log(JWT_SECRET);
                    // Creating JWT token using user's id
                    const token = jwt.sign({
                        id: result.rows[0].recruiter_id
                    }, secret, {expiresIn: "2d"});
                    res.status(200).json({
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
            return res.json({status: 500, message: err});
        }
    },
    signin : async (req, res) => {
        try {
            const {userType} = req.body;
            if (!userType) {
                return res.json({status: 404, message: "Type of user is missing"});
            }
            // if type equal to zero , user is jobseeker
            if (userType === 0) {

                const {password, email} = req.body

                // Checking if email present in the database or not
                const result = await pool.query("SELECT * FROM jobseekers where email=$1", [email]);
                if (result.rows.length === 0) { // If it is not present , return status 404 with messeage
                    return res.json({status: 400, message: "Email alredy exist"});
                } else { // checking password
                    const validPassword = await bcrypt.compare(password, result.rows[0].password);
                    if (! validPassword) {
                        console.log("Wrong password");
                        return res.status(400).json({message: "Wrong password"});
                    }
                    // console.log(JWT_SECRET);
                    // Creating JWT token using user's id
                    const token = jwt.sign({
                        id: result.rows[0].user_id
                    }, secret, {expiresIn: "2d"});
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
                        id: result.rows[0].recruiter_id
                    }, secret, {expiresIn: "2d"});
                    res.json({
                        status: 200,
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
            return res.json({status: 500, message: err});
        }
    }
}
