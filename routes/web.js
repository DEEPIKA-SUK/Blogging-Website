const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");
const favController = require("../controllers/favController");
const blogController = require("../controllers/blogController");
const blog_postController = require("../controllers/blog_postController");
const passport = require("passport");
const passportSetup = require("../config/passport-setup");
const authController = require("../controllers/authController");
const authCheck = require("../middlewares/authCheck");

const initRoutes = (app) => {
  // routes

  // create home route
  app.get("/", homeController().index);
  app.get("/about", homeController().about);

  //auth routes
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt: "select_account",
    })
  );
  app.get("/auth/logout", authController().logout);
  app.get(
    "/auth/google/redirect",
    passport.authenticate("google"),
    authController().google_redirect
  );

  //favourite list
  app.get("/fav", favController().fav);

  //particular category blog
  app.get("/blog", blogController().blog);

  //single blog
  app.get("/blog_post", blog_postController().blog_post);

  //profile
  app.get("/profile", authCheck, profileController().profile);

  // contactus
  app.post("/contact_us", homeController().contact_us);
};

module.exports = initRoutes;
