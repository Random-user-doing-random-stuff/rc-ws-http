const { ObjectId } = require('mongodb');

/**
 * @typedef {Object} User
 * @property {ObjectId} _id - Unique identifier for each user
 * @property {string} username - The user's chosen username
 * @property {string} email - The user's email address
 * @property {string} passwordHash - A hashed version of the user's password
 * @property {Date} createdAt - Timestamp of account creation
 * @property {Date} [lastActiveAt] - Optional: When the user was last active
 */

module.exports = {
  /**
   * This is just an empty export to have the typedef available for reference.
   * You can use the `User` typedef in other files by importing this module.
   */
};
