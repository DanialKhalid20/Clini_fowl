const Chat = require("../models/chats"); // Import your User model
const User = require("../models/user"); // Import your User model
const { getHChatStackFromUserId } = require('./chatservice');


async function saveChatMessage(userId, message, role, hchatKey) {
    if (!['user', 'assistant'].includes(role)) {
    console.error("Invalid role:", role);
    return; // or throw an error, depending on your error handling strategy
  }

  try {
    await Chat.create({ userId, message, role , hchatKey});
  } catch (err) {
    console.error("Error saving chat message:", err);
    // Handle error if needed
  }
}

async function getChatHistory(hchatKey) {
    try {
      const chatHistory = await Chat.find({ hchatKey }).sort({ createdAt: 1 });
      return chatHistory;
    } catch (err) {
      console.error("Error fetching chat history:", err);
      throw err;
    }
  }

  const saveHChatStack = async (userId, hchatStack) => {
    try {
      // Update the user's hchatStack in the database
      await User.findByIdAndUpdate(userId, { hchatStack });
      console.log('hchatStack saved successfully');
    } catch (error) {
      console.error('Error saving hchatStack:', error);
      throw new Error('Error saving hchatStack');
    }
  };

  const getHChatStack = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Get the HChat stack from the service
      const hchatStack = await getHChatStackFromUserId(userId);
  
      // Respond with the HChat stack
      res.status(200).json({ hchatStack });
    } catch (error) {
      // Handle any errors that occur
      console.error('Error fetching HChat stack:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteHChatStackFromUser = async (userId, hchatKey) => {
    try {
      // Find the user document based on userId
      const user = await User.findById(userId);
  
      // Check if the user exists
      if (!user) {
        throw new Error('User not found');
      }
  
      // Remove the specified hchatKey from the hchatStack array
      user.hchatStack = user.hchatStack.filter(key => key !== hchatKey);
  
      // Save the updated user document
      await user.save();
  
      // Return a success message
      return 'HChat stack deleted successfully';
    } catch (error) {
      // If an error occurs, throw it to be handled by the caller
      throw error;
    }
  };
  const deleteHChatStack = async (userId, hchatKey) => {
    try {
      // Delete all chats associated with the hchatKey
      await Chat.deleteMany({ hchatKey });
  
      // Remove the hchatKey from the user's hchatStack
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.hchatStack = user.hchatStack.filter(key => key !== hchatKey);
      await user.save();
  
      console.log('HChat stack and associated chats deleted successfully');
    } catch (error) {
      throw error;
    }
  };

const getUserDetails = async (userId) => {
  try {
    // Query the database to find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      // If user is not found, return null or handle the situation appropriately
      return null;
    }
    // Extract the email from the user object
    const userEmail = user.email;
    return userEmail;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error; // Rethrow the error or handle it appropriately
  }
};


module.exports = {deleteHChatStackFromUser,
  getHChatStack , 
  saveHChatStack ,
  getChatHistory ,
  saveChatMessage,
  deleteHChatStack,
  getUserDetails};
