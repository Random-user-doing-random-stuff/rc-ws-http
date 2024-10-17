const { ObjectId } = require('mongodb');

/**
 * @typedef {Object} User
 * @property {ObjectId} _id - Unique identifier for each user
 * @property {string} username - The user's chosen username
 * @property {string} email - The user's email address
 * @property {string} passwordHash - A hashed version of the user's password
 * @property {Date} createdAt - Timestamp of account creation
 */

module.exports = {
  name: null,
  email: null,
  password: null,
  createdAt: new Date().getTime()
};
