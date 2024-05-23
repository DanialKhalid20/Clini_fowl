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
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methodS: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.db, // Your MongoDB connection string
    }),
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
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

app.get(
  "/auth/google",
  pass_port.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  pass_port.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    if (req.user) {
      const userId = req.user.id;
      res.redirect(`http://localhost:5173/google-callback?userId=${userId}`);
    } else {
      res.redirect("/");
    }
  }
);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
