const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, required: true },
  role: { type: String, enum: ["user", "assistant"], required: true },
  hchatKey: {
    type: String,
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", chatSchema);

module.exports = Chat;
