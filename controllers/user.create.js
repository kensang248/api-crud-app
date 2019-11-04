const shortid = require("shortid");
const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync("./public/data.json", { encoding: "utf8" })
);

//Sign Up
module.exports.createNewUser = function(req, res) {
  const name = req.body.name;
  const newUser = { name: name, id: shortid.generate(), posts: [] };

  let usersList = JSON.parse(JSON.stringify(users));

  usersList.users.push(newUser);

  fs.writeFileSync("./public/data.json", JSON.stringify(usersList)); //saved
};

//Add new post
module.exports.createPost = function(req, res) {
  const content = req.body.content;
  const id = req.params.id;

  let usersList = JSON.parse(JSON.stringify(users));

  let user = usersList.users.find(item => {
    return item.id == id;
  });

  let indexOf = usersList.users.indexOf(user);
  user.posts.push({
    id: shortid.generate(),
    content: content,
    like: "0",
    comment: []
  });

  usersList.users[indexOf] = user;
  fs.writeFileSync("./public/data.json", JSON.stringify(usersList)); //saved
};
