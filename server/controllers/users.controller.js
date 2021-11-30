const bcrypt = require("bcryptjs");
const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helper");
const User = require("../models/User");

const userController = {};

userController.create = catchAsync(async (req, res, next) => {
  let {firstName, lastName, date, gender, email, password } = req.body;
  let user = await User.findOne({ email });
  console.log(user, "data");
  if (user)
    return next(new AppError(409, "User already exists", "Register Error"));

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  user = await User.create({
    firstName,
    lastName,
    date,
    gender,
    email,
    password,
  });
  const accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
})

userController.read = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    res.json(user);
  }
};

userController.getCurrentUser = async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not Found" });
  } else {
    // res.json(user);
    return sendResponse(
      res,
      200,
      true,
      [user, {userId}],
      null,
      "Successfully get current user"
    )
  }

};

userController.update = async (req, res) => {
  await User.findByIdAndUpdate(
    { _id: req.params.id },
    { email: req.body.email },
    { new: true },
    (err, user) => {
      console.log({ err, user });
      if (!user) {
        res.status(404).json({ message: "User not Found" });
      } else {
        res.json(user);
      }
    }
  );
};

userController.destroy = async (req, res) => {
  await User.findByIdAndDelete(req.params.id, (err, user) => {
    if (!user) {
      res.status(404).json({ message: "User not Found" });
    } else {
      res.json(user);
    }
  });
};

userController.createWithGoogle = async (req, res, next) => {
  console.log("input", req.user);
  const userInfo = req.user;
  console.log("it's me", userInfo);
  let result;
  //allow user to create account
  //from userInfo input , create a account in my database
  try {
    const found = await User.findOne({ email: userInfo.emails[0].value });
    if (found) throw new Error("User already registered");
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash("abc", salt);

    const newUser = {
      firstName: userInfo.name.givenName,
      lastName: userInfo.name.familyName,
      avatarUrl: userInfo.photos[0].value,
      email: userInfo.emails[0].value,
      password,
    };

    result = await User.create(newUser);
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully create account with google"
  );
};

userController.createWithFacebook = async (req, res, next) => {
  console.log("input", req.user);
  const userInfo = req.user;
  let result;
  //allow user to create account
  //from userInfo input , create a account in my database
  try {
    const found = await User.findOne({ email: userInfo.emails[0].value });
    if (found) throw new Error("User already registered");
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash("abc", salt);

    const defaultUser = {
      firstName: userInfo.displayName,
      email: userInfo.emails[0].value,
      facebookId: userInfo.id,
      password,
    };

    result = await User.create(defaultUser);
  } catch (error) {
    return next(error);
  }
  return sendResponse(
    res,
    200,
    true,
    result,
    false,
    "Successfully create account with facebook"
  );
};

module.exports = userController;
