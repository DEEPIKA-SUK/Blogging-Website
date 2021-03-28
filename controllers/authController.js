const passport = require("passport");
const passportSetup = require("../config/passport-setup");

const authController = () => {
  // factory functions
  return {
    logout: async (req, res) => {
      // handle with passport
      req.logout();
      res.redirect("/");
    },
    google_redirect: async (req, res) => {
      res.redirect("/profile/");
    },
  };
};

module.exports = authController;
