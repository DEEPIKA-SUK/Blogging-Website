const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for the google strat
      callbackURL: "/auth/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // check if user already exist
      User.findOne({ googleid: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have user
          done(null, currentUser);
        } else {
          // create user
          new User({
            username: profile.displayName,
            googleid: profile.id,
            email: profile.emails[0].value,
            thumbnail: profile._json.image
              ? profile._json.image.url
              : "https://i.stack.imgur.com/dr5qp.jpg",
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
