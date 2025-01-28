// // config/passport.js
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../models/UserSchema");
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOrCreate(
//         {
//           googleId: profile.id,
//           email: profile.emails[0].value,
//         },
//         (err, user) => done(err, user)
//       );
//     }
//   )
// );

