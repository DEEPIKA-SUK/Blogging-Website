const authCheck = (req, res, next) => {
  if (!req.user) {
    // not logged in
    //res.redirect("/auth/login");
    res.redirect("/");
  } else {
    // logged in
    next();
  }
};
module.exports = authCheck;
