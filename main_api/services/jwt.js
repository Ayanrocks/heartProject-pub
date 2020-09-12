/*
 * JWT Token Generation
 * @Author Ayan Banerjee
 */

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(
	path.resolve(__dirname, "../config/secrets/jwtRS256.key"),
	"utf8"
);
const cert = fs.readFileSync(
	path.resolve(__dirname, "../config/secrets/jwtRS256.key.pub"),
	"utf8"
);

/**
 * Returns a new JWT token
 * @param {data: string} data in string
 * @return {token: string} a new jwt token
 */
function generateToken(data) {
	const token = jwt.sign(data, privateKey, {
		algorithm: "RS256",
		expiresIn: "36h"
	});
	return token;
}

/**
 * Returns a decoded msg of a valid jwt token
 * @param {token: string} Token in string
 * @return {decoded: string} Decoded msg
 */
function verifyToken(token) {
	return jwt.verify(token, cert, function (err, decoded) {
		if (err) return err;
		return decoded;
	});
}

module.exports = {generateToken, verifyToken};
