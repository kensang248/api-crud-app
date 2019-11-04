const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync("./public/data.json", { encoding: "utf8" })
).users;

//userId
module.exports.userId = function(req, res) {
  const id = req.params.id;
  const user = users.find(item => {
    return item.id == id;
  });
  if (user) {
    res.json(user);
    return user;
  } else {
    res.send("User doesn't exist");
  }
};

//userPosts
module.exports.userPosts = function(req, res) {
  const userIdFunction = require("./user.search").userId;
  let userId = userIdFunction(req, res);

  if (userId) {
    if (userId.posts) {
      res.json(userId.posts);
      return userId.posts;
    } else {
      res.send("This user doesn't create any post");
    }
  } else {
    res.send("User doesn't exist");
  }
};

//userPostComments
module.exports.userSearchPosts = function(req, res) {
  const contentQuery = req.query.content.toLowerCase();

  const userPostsFunction = require("./user.search").userPosts;

  const userPostsFiltered = userPostsFunction.filter(function(userPost) {
    userPost.content.toLowerCase().include(contentQuery);
  });

  if (userPostsFiltered) {
    res.json(userPostsFiltered);
  } else {
    res.send("Your searching doesn't match anything");
  }
};
