const homeController = () => {
  // factory functions
  return {
    index: async (req, res) => {
      return res.render("home");
    },
    about: async (req, res) => {
      return res.render("about");
    },
  };
};

module.exports = homeController;
