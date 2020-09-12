const uuidv4 = require("uuid/v4");

/**
 * generates a uuid based on timestamp
 * @return {uuid: Stirng} A unique number
 */
function generateVerificationToken() {
  return uuidv4();
}

module.exports = { generateVerificationToken };
