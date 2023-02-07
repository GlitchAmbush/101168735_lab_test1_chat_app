const mongoose = require("mongoose");

const PrivateMessageSchema = new mongoose.Schema({
  from_user: { type: String, required: true },
  to_user: { type: String, required: true },
  message: { type: String },
  date_sent: { type: String },
});

PrivateMessageSchema.post("init", (doc) => {
  console.log("%s has been initialized from the db", doc._id);
});

const PrivateMessage = mongoose.model("private_messages", PrivateMessageSchema);
module.exports = PrivateMessage;
