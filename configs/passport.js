const passport = require('passport');
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});

var GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback   : true
},
(request, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

module.exports = passport;
