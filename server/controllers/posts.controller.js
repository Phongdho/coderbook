const Post = require("../models/Post");

const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const Comment = require("../models/Comment");
const postController = {};

postController.create = catchAsync(async (req, res) => {
  const post = await Post.create({ owner: req.userId, ...req.body });
  res.json(post);
});

postController.read = catchAsync(async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post)
    return next(new AppError(404, "Post not found", "Get Single Post Error"));

  await post.populate("owner").populate("comments", populate("owner"));
  await post.execPopulate();

  res.json(post);
});

postController.update = catchAsync(async (req, res) => {
  await Post.findByIdAndUpdate(
    { _id: req.params.id },
    { email: req.body.email },
    { new: true },
    (err, post) => {
      console.log({ err, post });
      if (!post) {
        res.status(404).json({ message: "Post not Found" });
      } else {
        res.json(post);
      }
    }
  );
});

postController.destroy = catchAsync(async (req, res) => {
  await Post.findByIdAndDelete(req.params.id, (err, post) => {
    if (!post) {
      res.status(404).json({ message: "Post not Found" });
    } else {
      res.json(post);
    }
  });
});

postController.list = catchAsync(async (req, res) => {
  let {page, limit, sortBy, ...filter} = {...req.query};
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 1;
  const totalPosts = await Post.count({...filter});
  const totalPages = Math.ceil(totalPosts / limit);
  const offset = limit * (page -1);
  const posts = await Post.find(filter)
    .sort({...sortBy, createdAt: -1})
    .skip(offset)
    .limit(limit).populate("owner").populate({path: "comments", populate: "owner"});
  return sendResponse(
    res, 
    200, 
    true, 
    { posts }, 
    null, 
    "Received posts");
});

// postController.getSinglePost = catchAsync(async(req, res) => {
//   const {userId} = req.params;
//   const posts = await Post.find({owner:userId});
//   return sendResponse(
//     res,
//     200,
//     true,
//     posts,
//     null,
//     "Successfully get current user's posts");
// });
postController.createComment = async (req, res) => {
  const comment = await Comment.create({
    ...req.body,
    owner: req.userId,
    post: req.params.id,
  });

  const post = await Post.findById(req.params.id);
  post.comments.push(comment._id);

  await post.save();
  await post.populate("comments");
  await post.execPopulate();

  return sendResponse(res, 200, true, { post }, null, "Comment created!");
};
module.exports = postController;
