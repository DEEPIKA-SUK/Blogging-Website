const Article = require("./../models/article");
const Favblog = require("./../models/favblog");
const favController = () => {
  // factory functions
  return {
    fav: async (req, res) => {
      //return res.render("fav", { user: req.user });
      const alreadypresent = await Favblog.findOne({
        slug: req.params.slug,
        member: req.user.username,
      });
      if (alreadypresent) {
        return res.redirect(`/blog/${alreadypresent.category}`);
      }
      const blogs = await Article.findOne({ slug: req.params.slug }).sort({
        createdAt: "desc",
      });

      const favblog = new Favblog({
        member: req.user.username,
        title: blogs.title,
        description: blogs.description,
        markdown: blogs.markdown,
        likes: blogs.likes,
        category: blogs.category,
        author: blogs.author,
        slug: blogs.slug,
        sanitizedHtml: blogs.sanitizedHtml,
        image: blogs.image,
      });

      favblog
        .save()
        .then((favblog) => {
          res.redirect(`/blog/${blogs.category}`);
        })
        .catch((err) => {
          console.log(err);
          res.render(`home`, { user: req.user });
        });
    },
    favdisplay: async (req, res) => {
      //return res.render("fav", { user: req.user });
      const blogs = await Favblog.find({ member: req.user.username }).sort({
        createdAt: "desc",
      });

      return res.render("fav", {
        user: req.user,
        blogs: blogs,
        category: req.params.slug,
      });
    },
    del: async (req, res) => {
      //return res.render("fav", { user: req.user });
      await Favblog.findOneAndDelete({
        member: req.user.username,
        slug: req.params.slug,
      });

      const blogs = await Favblog.find({ member: req.user.username }).sort({
        createdAt: "desc",
      });

      return res.render("fav", {
        user: req.user,
        blogs: blogs,
        category: req.params.slug,
      });
    },
    like: async (req, res) => {
      const blogs = await Article.findOne({ slug: req.params.slug }).sort({
        createdAt: "desc",
      });
      var likes = blogs.likes +1;
      Article
        .updateOne(
           { slug: req.params.slug },
           { $set: { "likes": likes }}
        ).then(() => {
          res.redirect(`/blog/${blogs.category}`);
        })
        .catch((err) => {
          console.log(err);
          res.render(`home`, { user: req.user });
        });
    
    },
  };
};

module.exports = favController;
