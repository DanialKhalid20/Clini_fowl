//Google authentication

const passport = require("passport");
const oauth2strategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user");

function setupPassport() {
  // Passport Google OAuth2 strategy
  passport.use(
    new oauth2strategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({
            email: profile.emails[0].value,
          });
          if (existingUser) {
            return done(null, existingUser);
          } else {
            const newUser = new User({
              email: profile.emails[0].value,
              password: "NA",
              token: "NA",
              tokenExpires: 0,
            });
            newUser.verified = true;
            await newUser.save();
            return done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );

  // Serialize and deserialize user
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  return passport;
}

module.exports = setupPassport;
