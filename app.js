const express = require("express");
require("./config/config").config;

const app = express();

const port = process.env.PORT;

const userRoute = require("./routes/user.route");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));

app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
