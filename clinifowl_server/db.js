const mongoose = require("mongoose");

// Function to establish database connection
const connection = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Set the timeout to 30 seconds (adjust as needed)
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

// Export both the database connection function and the User model
module.exports = connection;
