const express = require("express");
const controller = require("../controllers/user.search");

const router = express.Router();

router.get("/:id", controller.userId);

router.get("/:id/posts", controller.userPosts);

router.get("/:id/posts/?content=", controller.userSearchPosts);

module.exports = router;
