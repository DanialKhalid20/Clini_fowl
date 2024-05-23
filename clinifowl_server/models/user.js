// user.model.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  token: { type: String },
  tokenExpires: { type: Date, required: true },
  hchatStack: { type: [String], default: [] } // Array to store hchatStack
});

const User = mongoose.model('User', userSchema);

module.exports = User;
