const favController = () => {
  // factory functions
  return {
    fav: async (req, res) => {
      return res.render("fav");
    },
  };
};

module.exports = favController;
