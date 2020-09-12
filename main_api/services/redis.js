const client = require("../database/redis");

/**
 * Adds to redis
 * @param {key: string}
 * @param {value: string}
 */
function addToRedis(key, value) {
  client.set(key, value, "EX", 7200);
}

/**
 * Returns a promise if found on redis
 * @param {key: string} Token in string
 * @return {Promise<data>}
 */
function getFromRedis(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, reply) => {
      if (err) reject(err);

      resolve(reply);
    });
  });
}

/**
 * Removes from redis
 * @param {key: string}
 */
function removeFromRedis(key) {
  client.del(key, err => {
    if (err) {
      console.log(error);
    }
  });
}

module.exports = { addToRedis, getFromRedis, removeFromRedis };
