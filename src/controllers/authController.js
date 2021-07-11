const pool = require('../config/pg');
const secret = "naukri";
module.exports = {
    signup: async (req, res) => {
        try {
            const {userType} = req.body;
            if (!userType) {
                return res.json({status: 400, message: "Type of user is missing"});
            }
            //if type equal to zero , user is jobseeker  
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
                    return res.json({status: 404, message: "Email alredy exist"});
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
                        id: result.rows[0].id
                    }, secret, {expiresIn: "2d"});
                    res.status(200).json({
                        token,
                        data: {
                            user_detail: {
                                user_id: result.rows[0].id,
                                email: result.rows[0].email,
                                name: result.rows[0].name,
                                city: result.rows[0].city,
                                mobile_number: result.rows[0].mobile_number
                            }
                        }
                    });
                }
            }else{

            }
        } catch (err) {}

    }
}
