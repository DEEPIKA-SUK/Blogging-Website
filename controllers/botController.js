const botController = () => {
  return {
    bot: async (req, res) => {
      return res.render("chatbot", { user: req.user });
    },
  };
};

module.exports = botController;
