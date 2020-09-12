/*
 * Authentication Routes file
 * @Author Ayan Banerjee
 */

const controllers = require("../database/controllers");
const bcrypt = require("../services/bcrypt");
const passport = require("../services/passport");
const jwt = require("../services/jwt");

// Exporting auth routes
module.exports = app => {
	/**
	 * Signup Route
	 * @method POST
	 * @body {Email: string, Name: String, Password: String}
	 */
	app.post("/signup", async (req, res) => {
		const {password} = req.body;
		let msg = "";
		if (password && req.body.email && req.body.name) {
			try {
				const {hashedPassword, salt} = await bcrypt.hashPassword(password);
				msg = await controllers.saveUserToDB(req.body, hashedPassword, salt);
				res.status(200);
				res.send(msg)
			} catch (e) {
				msg = e;
				res.status(403);
				res.send(msg)
			}
		} else {
			msg = "Please enter Email/Name/Password";
			res.status(403);
			res.send(msg)
		}
	});

	/**
	 * Login Route
	 * @method POST
	 * @body {Email: string, Password: String}
	 */
	app.post("/login", async (req, res) => {
		const {email, password} = req.body;
		let msg = "";
		if (email && password) {
			try {
				msg = await controllers.getUserFromDB(email, password);
				res.cookie('token', msg, {
					expires: new Date(Date.now() + 604800000),
					secure: false, // set to true if your using https
					httpOnly: true,
				})
				res.status(200)
				res.send(msg)
			} catch (e) {
				msg = e;
				res.status(403);
				res.clearCookie("token")
				res.send(msg)
			}
		} else {
			msg = "Please Enter Email & Password";
			res.status(403);
			res.clearCookie("token")
			res.send(msg)
		}
	});

	/**
	 * Verification Route
	 * @method GET
	 * @param {UserID: string, VerifyToken: String}
	 */
	app.get("/:userID/verification/:verifyToken", async (req, res) => {
		let msg;
		try {
			msg = await controllers.verifyUser(
				req.params.userID,
				req.params.verifyToken
			);
			res.status(200)
			res.redirect("/")
		} catch (error) {
			msg = error;
			res.status(403)
			res.send(msg)
		}
	});

	// Authentication user info route
	app.get("/user/loggedIn", passport.authenticate('jwt', {session: false}), (req, res) => {
			if (req && req.cookies) {
				const token = req.cookies['token'];
				const userData = jwt.verifyToken(token);
				res.send(userData);
			} else {
				res.status(403);
				res.send("Invalid Token");
			}
		}
	);

	// logout route
	app.get("/user/logout", passport.authenticate('jwt', {session: false}), (req, res) => {
		res.clearCookie("token")
		res.status(200)
		res.send("Logged Out")
	})
};
