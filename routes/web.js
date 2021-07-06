const homeController = require("../controllers/homeController");
const profileController = require("../controllers/profileController");
const favController = require("../controllers/favController");
const blogController = require("../controllers/blogController");
const blog_postController = require("../controllers/blog_postController");
const passport = require("passport");
const passportSetup = require("../config/passport-setup");
const authController = require("../controllers/authController");
const authCheck = require("../middlewares/authCheck");
const botController = require("../controllers/botController");
const Article = require("./../models/article");
var myModule = require("./../middlewares/upload");
var upload = myModule.upload;

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
  app.get("/fav/:slug", favController().fav);
  app.get("/fav", favController().favdisplay);
  app.get("/favdel/:slug", favController().del);
  app.get("/like/:slug", favController().like);

  //particular category blog
  app.get("/blog/:slug", blogController().blog);

  //single blog
  app.get("/blog_post", blog_postController().blog_post);

  //profile
  app.get("/profile", authCheck, profileController().profile);

  // contactus
  app.post("/contact_us", homeController().contact_us);

  //chatbot
  app.get("/chatbot", botController().bot);

  //new articles
  app.get("/new/:slug", (req, res) => {
    console.log();
    res.render("articles/new_article", {
      article: new Article(),
      category: req.params.slug,
      user: req.user,
    });
  });

  app.get("/articles/:slug", async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug });
    if (article == null) res.redirect("/blog");
    res.render("blog_post", { article: article, user: req.user });
  });

  app.post(
    "/articles",
    upload,
    async (req, res, next) => {
      req.article = new Article();
      next();
    },
    saveArticleAndRedirect("new_article")
  );

  //edit articles
  app.get("/edit/:id", async (req, res) => {
    const article = await Article.findById(req.params.id);
    console.log(article);
    res.render("articles/edit", {
      article: article,
      category: article.category,
      user: req.user,
    });
  });

  app.put(
    "/articles/:id",
    upload,
    async (req, res, next) => {
      req.article = await Article.findById(req.params.id);
      next();
    },
    saveArticleAndRedirect("edit")
  );

  //delete articles
  app.delete("/articles/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/");
  });
};

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;
    article.category = req.body.category;
    article.author = req.body.author;
    article.image = req.file.filename;
    console.log(req.file.filename);
    try {
      article = await article.save(); // returns id for the article
      console.log(article);
      res.redirect(`/articles/${article.slug}`);
    } catch (e) {
      res.render(`articles/${path}`, { article: article, user: req.user });
    }
  };
}

module.exports = initRoutes;
