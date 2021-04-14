const Article = require("./../models/article");
const blogController = () => {
  // factory functions
  return {
    blog: async (req, res) => {
      const blogs = await Article.find({ category: req.params.slug }).sort({
        createdAt: "desc",
      });
      return res.render("blog", {
        user: req.user,
        blogs: blogs,
        category: req.params.slug,
      });
    },
  };
};

module.exports = blogController;
