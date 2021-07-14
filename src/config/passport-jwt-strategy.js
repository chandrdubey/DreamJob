const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require("./connection");
const  config  = require('./index');
const JWT_SECRET = config.JWT_SECRET;

// At a minimum, you must pass these options (see note after this code snippet for more)
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:config.JWT_SECRET
};
// The JWT payload is passed into the verify callback
passport.use(new JwtStrategy(options, function(jwt_payload, done) {

    console.log(jwt_payload);
    // We will assign the `sub` property on the JWT to the database ID of user
    pool.query('SELECT * FROM recruiters WHERE recruiter_id=$1',[jwt_payload.id],(err, user)=> {
        
        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user.rows[0]);
        } else {
            return done(null, false);
        }
        
    });
    
}));

module.exports = passport;