const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cookieSession = require("cookie-session");
const methodOverride = require('method-override')
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const Article = require('./models/article')
var socket = require("socket.io");

// assests
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Database connection
const DBUrl = keys.mongodb.dbURI;
mongoose.connect(DBUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Connection failed...");
  });

// set template engine
app.set("views", path.join(__dirname, "/src/views"));
app.set("view engine", "ejs");

// routes
require(path.join(__dirname, "/routes/web"))(app);

var server = app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});

//socket setup
var io = socket(server);
io.on("connection", function (socket) {
  console.log("made con");

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
