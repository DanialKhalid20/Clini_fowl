require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const login = require("./Auth/loginController"); // Import the login function from the object
const signup = require("./Auth/signup");
const email_verify = require("./Auth/emailverify");
const passport = require("./Auth/passportSetup");
const session = require("express-session");
const cleanupExpiredTokens = require("./Auth/cronjob");
const cookieParser = require("cookie-parser");
const { handleChatRequest } = require('./Auth/openai');
const { requireAuth } = require('./Securinglandingpage/middleware');
const {deleteHChatStackFromUser, 
  getHChatStack ,
  saveHChatStack, 
  getChatHistory  ,
  saveChatMessage,
  deleteHChatStack,
  getUserDetails}  =  require("./Auth/chatcontroller");

const router = express.Router();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, //because we are using http instead of https
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
//Google signup
const pass_port = passport(); // Call the setupPassport function to set up Passport

app.use(pass_port.initialize());
app.use(pass_port.session());

connection();

app.post("/Loginpage", login.login); // Use the imported login function as the route handler
app.post("/Signuppage", signup.signup);
app.get("/verification", email_verify.email_verify);
cleanupExpiredTokens();



app.get('/auth/google', pass_port.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', pass_port.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    res.redirect(`http://localhost:5173/google-callback?userId=${userId}`);
  } else {
    res.redirect('/');
  }
});

app.post('/api/chat', handleChatRequest);

app.post('/api/saveChatMessage', async (req, res) => {
  const { userId, message, role ,hchatKey} = req.body;
  try {
    await saveChatMessage(userId, message, role,hchatKey);
    res.status(200).json({ message: 'Chat message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/chatHistory/:hchatKey', async (req, res) => {
  const { hchatKey } = req.params;
  try {
    const chatHistory = await getChatHistory(hchatKey);
    
    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/saveHChatStack', async (req, res) => {
  const { userId, hchatStack } = req.body;
  console.log(userId);
  console.log(hchatStack);

  try {
    await saveHChatStack(userId, hchatStack);
    res.status(200).json({ message: 'hchatStack saved successfully' });
  } catch (error) {
    
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/getHChatStack/:userId', getHChatStack);

app.get('/api/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // Logic to fetch user details based on userId
    // This could involve querying your database or any other data source
    const userDetails = await getUserDetails(userId);
    res.status(200).json(userDetails);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/deleteHChatStack/:userId/:hchatKey', async (req, res) => {
  const { userId, hchatKey } = req.params;
  try {
    await deleteHChatStack(userId, hchatKey);
    const message = await deleteHChatStackFromUser(userId, hchatKey);
    res.status(200).json({ message });
  } catch (error) {
    console.error('Error deleting HChat stack:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
