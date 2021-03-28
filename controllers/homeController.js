const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const Message = require("../models/message-model");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: keys.contact.email,
    pass: keys.contact.pass,
  },
});

const homeController = () => {
  // factory functions
  return {
    index: async (req, res) => {
      return res.render("home", { user: req.user });
    },
    about: async (req, res) => {
      return res.render("about", { user: req.user });
    },
    contact_us: async (req, res) => {
      const { name, email, message } = req.body;
      new Message({
        name: name,
        email: email,
        message: message,
      }).save();
      var mailOptions = {
        from: keys.contact.email,
        to: email,
        subject: "Thanks for contacting us!",
        html: `<p>Hello ${name}</p><p>Thanks for contacting us! This auto-reply is just to let you know that we have received your email and will get back to you with a (human) response as soon as possible.</p>
        <p>Cheers!</p>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return res.redirect("/");
    },
  };
};

module.exports = homeController;
