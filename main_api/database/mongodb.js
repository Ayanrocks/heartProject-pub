/*
* MongoDB Connection File
* @Author Ayan Banerjee
*/

const mongoose = require('mongoose');

mongoose.connect("mongodb://mongo:27017/hearty", {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false
})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
	console.log("DB Connected");
});

module.exports = db
