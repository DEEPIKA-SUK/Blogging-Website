const profileController = () => {
  // factory functions
  return {
    profile: async (req, res) => {
      return res.render("profile");
    },
  };
};

module.exports = profileController;
