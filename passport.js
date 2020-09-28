const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { addnewThird, findOne } = require("./Model/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.AUTH_URL + "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      const prof = profile._json;
      const find = await findOne(prof.email, prof.sub);
      if (find.res) {
        return done(null, find.res);
      }
      const an = await addnewThird(
        prof.email,
        prof.name,
        prof.sub,
        "GOOGLE",
        prof.picture
      );
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, user);
});
