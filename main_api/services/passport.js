/*
 * PassportJS middleware File
 * @Author Ayan Banerjee
 */

const JwtStrategy = require("passport-jwt").Strategy,
	passport = require("passport"),
	User = require("../models/User"),
	fs = require("fs"),
	path = require("path"),
	cert = fs.readFileSync(
		path.resolve(__dirname, "../config/secrets/jwtRS256.key.pub"),
		"utf8"
	);
const jwt = require('../services/jwt')

function tokenExtracter(req) {
	var token = null;
	if (req && req.cookies) {
		token = req.cookies['token'];
	}
	return token;
}

var opts = {};

opts.jwtFromRequest = tokenExtracter;
opts.secretOrKey = cert;
opts.issuer = "orilliance.com";

/**
 * Returns a User if exists else forwards request to the handler
 * @param {jwt_payload: string}
 * @return {User: User} A user objects if exists else forwards request to the controller.
 */
passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		const {id, name, email} = jwt_payload;
		User.findOne({_id: id, name, email}, (err, user) => {
			if (err) done(err, null);
			if (user) return done(null, user);
			else {
				return done("Invalid Token", null);
			}
		});
	})
);

module.exports = passport;
