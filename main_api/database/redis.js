const redis = require("redis"),
    client = redis.createClient("redis://redis:6379");


client.on("error", function (err) {
    console.log("Error " + err);
});

client.on("connect", () => console.log("Connected To Redis"));

module.exports = client