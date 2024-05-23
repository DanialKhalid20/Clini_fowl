// services/hchatService.js

const User = require("../models/user"); // Import the User model

// Define the function to get HChat stack based on userId
const getHChatStackFromUserId = async (userId) => {
  try {
    // Fetch the user document from the database based on userId
    const user = await User.findById(userId);

    // Check if the user document exists
    if (!user) {
      throw new Error("User not found");
    }

    // Extract the HChat stack from the user document
    const hchatStack = user.hchatStack || [];

    // Return the HChat stack
    return hchatStack;
  } catch (error) {
    // If an error occurs, throw it to be handled by the caller
    throw error;
  }
};

// Export the function to be used in other files
module.exports = { getHChatStackFromUserId };
