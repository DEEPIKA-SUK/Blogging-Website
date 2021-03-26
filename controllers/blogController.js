const blogController = () => {
  // factory functions
  return {
    blog: async (req, res) => {
      return res.render("blog");
    },
  };
};

module.exports = blogController;
