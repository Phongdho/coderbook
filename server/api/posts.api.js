var express = require("express");
var router = express.Router();

const authMiddleware = require("../middlewares/authentication");
const postsController = require("../controllers/posts.controller");
const postController = require("../controllers/posts.controller");

router.post("/", authMiddleware.loginRequired, postsController.create);
// router.get("/:userId", authMiddleware.loginRequired, postsController.getSinglePost);
router.get("/", authMiddleware.loginRequired, postController.list);
router.get("/:id", postsController.read);
router.post(
    "/:id/comments",
    authMiddleware.loginRequired,
    postsController.createComment
  );
router.put("/:id", postsController.update);
router.delete("/:id", postsController.destroy);

module.exports = router;
