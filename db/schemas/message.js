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
  "_id": ObjectId,          // Unique identifier for each message
  "senderId": ObjectId,      // User ID of the sender
  "recipientId": ObjectId,   // Optional: User ID of recipient for direct messaging
  "chatRoomId": ObjectId,    // Optional: If the message belongs to a chat room
  "messageText": null,     // The message content
  "createdAt": Date       // Timestamp for when the message was sent
}