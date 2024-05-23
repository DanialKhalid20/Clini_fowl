const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  chatSessions: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, required: true },
      messages: [
        {
          text: { type: String, required: true },
          isBot: { type: Boolean, required: true }
        }
      ]
    }
  ],
  timestamp: { type: Date, default: Date.now }
});

const ChatHistory = mongoose.models.ChatHistory || mongoose.model("ChatHistory", chatHistorySchema);

module.exports = ChatHistory;
