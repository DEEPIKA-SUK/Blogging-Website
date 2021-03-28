const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  name: String,
  email: String,
  message: String,
});
const Message = mongoose.model("message", messageSchema);
module.exports = Message;
