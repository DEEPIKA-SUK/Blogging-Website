const blogController = () => {
  // factory functions
  return {
    blog: async (req, res) => {
      return res.render("blog", { user: req.user });
    },
  };
};

module.exports = blogController;
