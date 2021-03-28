const profileController = () => {
  // factory functions
  return {
    profile: async (req, res) => {
      return res.render("profile", { user: req.user });
    },
  };
};

module.exports = profileController;
