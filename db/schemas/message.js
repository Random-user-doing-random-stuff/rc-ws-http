// /db/schemas/message.js

const { ObjectId } = require("mongodb");

module.exports = {
  _id: ObjectId,
  senderId: ObjectId,
  chatRoomId: ObjectId,
  messageText: String,  // String instead of null
  createdAt: Date
};
