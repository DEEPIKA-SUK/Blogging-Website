const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");
const favController = require("../controllers/favController");
const blogController = require("../controllers/blogController");
const blog_postController = require("../controllers/blog_postController");

const initRoutes = (app) => {
  // routes

  // create home route
  app.get("/", homeController().index);
  app.get("/about", homeController().about);

  //favourite list
  app.get("/fav", favController().fav);

  //particular category blog
  app.get("/blog", blogController().blog);

  //single blog
  app.get("/blog_post", blog_postController().blog_post);

  //profile
  app.get("/profile", profileController().profile);
};

module.exports = initRoutes;
