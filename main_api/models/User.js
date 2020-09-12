/*
* User Schema Model
* @Author Ayan Banerjee
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	salt: String,
	verified: {type: Boolean, default: false},
	joinedAt: {type: Date, default: Date.now, required: true},
	reports: [{type: Schema.Types.ObjectId, ref: 'Report'}]
});

module.exports = mongoose.model("User", UserSchema)
