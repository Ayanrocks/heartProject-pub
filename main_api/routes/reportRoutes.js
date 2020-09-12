const passport = require("../services/passport");
const {saveReportsToDb, getReportsFromDb} = require("../database/controllers.js")

module.exports = app => {
	app.post("/user/data/report/save", passport.authenticate('jwt', {session: false}), async (req, res) => {
		try {
			const result = await saveReportsToDb(req.body)
			if (result) {
				res.send("Success")
			}
		} catch (e) {
			res.status(500)
			res.send({error: e})
		}
	})

	app.get("/user/data/report/get/:id", passport.authenticate('jwt', {session: false}), passport.authenticate('jwt', {session: false}), async (req, res) => {
		try {
			const result = await getReportsFromDb(req.params.id)
			const sortedByDate = result.sort((a, b) => b.createdAt - a.createdAt)
			res.json({reports: sortedByDate})
		} catch (e) {
			res.status(500)
			res.send(e)
		}
	})
}
