const Article = require("./../models/article");
const profileController = () => {
  // factory functions
  return {
    profile: async (req, res) => {
      const blogs = await Article.find({ author: req.user.username }).sort({
        createdAt: "desc",
      });

      return res.render("profile", {
        user: req.user,
        blogs: blogs,
        category: req.params.slug,
      });
    },
  };
};

module.exports = profileController;
