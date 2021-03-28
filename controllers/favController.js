const favController = () => {
  // factory functions
  return {
    fav: async (req, res) => {
      return res.render("fav", { user: req.user });
    },
  };
};

module.exports = favController;
