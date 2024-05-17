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

connection();
app.post("/Loginpage", login.login); // Use the imported login function as the route handler
app.post("/Signuppage", signup.signup);
app.get("/verification", email_verify.email_verify);
cleanupExpiredTokens();

//Google signup
const pass_port = passport(); // Call the setupPassport function to set up Passport

app.use(pass_port.initialize());
app.use(pass_port.session());

app.get(
  "/auth/google/callback",
  pass_port.authenticate("google", {
    successRedirect: "http://localhost:5173/Landing",
    failureRedirect:
      "http://localhost:5173/Loginpage?error=Email already exists",
  })
);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
