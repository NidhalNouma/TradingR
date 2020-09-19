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
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      const prof = profile._json;
      const find = await findOne(prof.email, prof.sub);
      if (find.res) {
        return done(null, find.res);
      }
      console.log(find);
      const an = await addnewThird(
        prof.email,
        prof.name,
        prof.sub,
        "GOOGLE",
        prof.picture
      );
      console.log(an);
      return done(null, profile);
      //   });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log(user, "ser");
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  //   User.findById(id, function (err, user) {
  console.log(id, "desser");
  done(null, user);
  //   });
});

// const FacebookStrategy = require("passport-facebook").Strategy;
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: process.env.AUTH_URL + "/auth/facebook/callback",
//       profileFields: [
//         "id",
//         "emails",
//         "displayName",
//         "name",
//         "gender",
//         "profileUrl",
//         "photos",
//       ],
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       // User.findOrCreate(..., function(err, user) {
//       //   if (err) { return done(err); }
//       console.log(profile, "Facebook");
//       return done(null, profile);
//       // });
//     }
//   )
// );
