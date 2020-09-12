/*
* DB Controllers
* @Author Ayan Banerjee
*/


const User = require('../models/User')
const Reports = require('../models/Reports')
const bcrypt = require("../services/bcrypt")
const jwt = require("../services/jwt")
const mailer = require("../services/mailer")
const token = require("../services/tokenGenerator")
const client = require("../services/redis")

// Save User to DB
function saveUserToDB(data, hashedPassword, salt) {
	const {name, email} = data;
	console.log(name, email)
	const newUser = new User({
		name,
		email,
		password: hashedPassword,
		salt
	})
	return new Promise((resolve, reject) => {
		// Find Existing user
		User.findOne({name, email}, (err, user) => {
			if (err) reject(err)
			if (user) reject("This Account already exists. Please try logging in instead.")
			else {
				// Saving new user
				newUser.save((err, data) => {
					if (err) {
						reject(err);
					}
					const uuid = token.generateVerificationToken()
					client.addToRedis(data.id, uuid)
					const url = `https://thehearty.tk/${data.id}/verification/${uuid}`
					mailer.sendVerificaionMail(email, name, url)
					resolve({msg: "User Created Successful"})
				})
			}
		})
	})
}

function getUserFromDB(email, password) {
	return new Promise((resolve, reject) => {
		User.findOne({email}, async (err, user) => {
			if (err) reject(err)
			if (user) {
				if (await bcrypt.comparePassword(password, user.password)) {
					if (user.verified) {
						const token = jwt.generateToken({
							id: user._id,
							name: user.name,
							email: user.email,
							joinedAt: user.joinedAt,
							verified: user.verified,
							iss: "orilliance.com"
						});
						resolve(token)
					} else {
						reject("User not verified")
					}
				} else {
					reject("Invalid Email/Password")
				}
			}
			reject("User Not Found")
		})
	})
}

async function verifyUser(ID, token) {
	const storedToken = await client.getFromRedis(ID)
	return new Promise((resolve, reject) => {
		try {
			if (storedToken === token) {
				User.findOneAndUpdate({_id: ID}, {verified: true}, (err, user) => {
					if (err) reject("User Not Found")
					if (user) {
						client.removeFromRedis(ID)
						resolve("Verified Successfully")
					}
					reject("User not found. Url String tampered with.")
				})
			} else {
				reject("Token Invalid or Tampered With")
			}
		} catch (e) {
			console.log(e);
			reject("Token Expired. Please Try Again")
		}
	})
}

function saveReportsToDb(data) {
	const {patientId, angina, chestPain, thalassemiaRate, heartRate, sex, age, result} = data
	const newReports = new Reports({
		patientId,
		angina,
		chestPain,
		thalassemiaRate,
		heartRate,
		sex,
		age,
		result
	})
	return new Promise(((resolve, reject) => {
		User.findOne({_id: newReports.patientId}, (err, user) => {
			if (err) reject(err)
			if (!user) reject("User Not Found")
			else {
				user.reports.push(newReports)
				user.save((err) => {
					if (err) reject(err)
				})
				newReports.save()
				resolve("Success")
			}
		})
	}))
}

function getReportsFromDb(id) {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findOne({_id: id}).populate('reports')
			if (!user) reject("User not found")
			else {
				resolve(user.reports)
			}
		} catch (err) {
			if (err) reject(err)
		}
	})
}

module.exports = {saveUserToDB, getUserFromDB, verifyUser, saveReportsToDb, getReportsFromDb}
