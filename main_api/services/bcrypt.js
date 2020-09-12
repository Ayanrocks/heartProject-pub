/*
 * Bcrypt hash file
 * @Author Ayan Banerjee
 */

const bcrypt = require("bcrypt");
const saltRounds = 10;
/**
 * Returns a promise with hashed Password
 * @param {passwrord: string} Password in string
 * @return {Promise<HashedPassword>} Promise with hashed Password
 */
function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, function(err, hashedPassword) {
        if (err) {
          reject(err);
        }
        resolve({ hashedPassword, salt });
      });
    });
  });
}

/**
 * Returns true if both passwrord matchs, else false
 * @param {password: string}
 * @param  {hashedPassword: string}
 * @return {Promise<Boolean>}
 */
function comparePassword(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) reject(err);

      resolve(result);
    });
  });
}

module.exports = { hashPassword, comparePassword };
