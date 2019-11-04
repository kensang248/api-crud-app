const express = require("express");
const searchController = require("../controllers/user.search");
const createController = require("../controllers/user.create");

const router = express.Router();

//GET
router.get("/", searchController.getAllUsers);

router.get("/:id", searchController.userId);

router.get("/:id/posts", searchController.userPosts);

router.get("/:id/posts/?content=", searchController.userSearchPosts);

//POST
router.post("/create", createController.createNewUser);

router.post("/create/:id/post", createController.createPost);

//PUT

router.put("/modify");

//DELETE

router.delete("/delete");

module.exports = router;
