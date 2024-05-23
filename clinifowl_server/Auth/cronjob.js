//This function is use to remove any account that is not verified after token expiry

const cron = require("node-cron");
const User = require("../models/user");

async function cleanupExpiredTokens() {
  try {
    // Find and remove users with expired tokens
    const expiredUsers = await User.find({
      tokenExpires: { $lte: new Date() },
      verified: false,
    });
    if (expiredUsers.length > 0) {
      for (const user of expiredUsers) {
        await user.deleteOne();
        console.log(`User ${user.email} removed due to expired token.`);
      }
    }
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
}

cron.schedule("* * * * *", cleanupExpiredTokens);

module.exports = cleanupExpiredTokens;
