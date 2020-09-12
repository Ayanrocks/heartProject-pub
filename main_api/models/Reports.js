/*
* Report Schema Model
* @Author Ayan Banerjee
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
	patientId: {type: mongoose.ObjectId, required: true},
	angina: {type: Number, required: true},
	chestPain: {type: Number, required: true},
	thalassemiaRate: {type: Number, required: true},
	heartRate: {type: Number, required: true},
	sex: {type: Number, required: true},
	age: {type: Number, required: true},
	result: {type: Number, required: true},
	createdAt: {type: Date, default: Date.now, required: true }
})

module.exports = mongoose.model("Report", ReportSchema)
// module.exports = ReportSchema
