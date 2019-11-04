const shortid = require("shortid");
const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync("./public/data.json", { encoding: "utf8" })
).users;

//Sign Up
module.exports.createNewUser = function(req, res) {
  const name = req.body.name;
  const newUser = { name: name, id: shortid.generate(), posts: [] };

  let usersList = JSON.parse(JSON.stringify(users));

  usersList.push(newUser);

  fs.writeFileSync("./public/data.json", JSON.stringify(usersList)); //saved
};

//Add new post
module.exports.createPost = function(req, res) {
  const content = req.body.content;
  const id = req.params.id;

  let usersList = JSON.parse(JSON.stringify(users));
  let user = usersList.find(item => {
    return item.id == id;
  });
  if (user) {
    let indexOfUser = users.indexOf(user);

    user.posts.push({
      content: content,
      id: shortid.generate(),
      like: "0",
      comment: []
    });
    usersList[indexOfUser] = user;

    fs.writeFileSync("./public/data.json", JSON.stringify(usersList)); //saved
  } else {
    res.send("Fuck off");
  }
};
