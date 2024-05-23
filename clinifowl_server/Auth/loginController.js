const User = require("../models/user"); // Import your User model
const bcrypt = require("bcrypt"); // Import bcrypt for hashing passwords
const Chat = require("../models/chats"); // Import your User model

// Define the login route handler function
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ error: "Account does not exist" });
    } else if (user.verified === false) {
      return res.status(400).json({ error: "Please verify your email first" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Check if the passwords match
    if (!passwordMatch) {

      return res.status(400).json({ error: "Incorrect password" });
    }
    req.session.userEmail = user.email;
    console.log(req.session.userEmail);
    // If needed, you can also send additional user information

    return res.json({ message: "Success"  , userId: user._id});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


// Export an object containing the login function
module.exports = { login };
