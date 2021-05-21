const blog_postController = () => {
  // factory functions
  return {
    blog_post: async (req, res) => {
      return res.render("blog_post", { user: req.user ? req.user : null });
    },
  };
};

module.exports = blog_postController;
