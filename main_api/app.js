/*
 * Main app.js File
 * @author Ayan Banerjee
 */

// Dependencies
const express = require("express"),
	helmet = require("helmet"),
	morgan = require("morgan"),
	bodyParser = require("body-parser");

const app = express();
const db = require("./database/mongodb");
require("./database/redis");
require("./models/Reports");
require("./models/User");
const cookieParser = require('cookie-parser');
const passport = require("./services/passport");
const expressGraphQL = require("express-graphql");
const {rootValue, schema} = require("./services/graphql");
const path = require('path')

// Middlewares
app.use(helmet());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// To use graphql
app.use("/graphql", expressGraphQL({schema, rootValue, graphiql: true}));

// Routes
app.get("/ping", (req, res) => {
	res.send({Status: "All System Online"});
});

// Auth Route File
require("./routes/authRoutes")(app);
require("./routes/reportRoutes")(app);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "./client/build/"))
	})
}

// Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("\uD83D\uDE04 Server Started at %s", PORT));

process.on("SIGTERM", db.close);
process.on("SIGINT", db.close);
