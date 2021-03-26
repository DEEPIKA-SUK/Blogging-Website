const blog_postController = () => {
  // factory functions
  return {
    blog_post: async (req, res) => {
      return res.render("blog_post");
    },
  };
};

module.exports = blog_postController;
