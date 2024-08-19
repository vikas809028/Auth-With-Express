const userModel = require("../model/userSchema");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Please Enter All the required feild",
    });
  }
  const validEmail = emailValidator.validate(email);
  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please Enter valid email id",
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirm Password does not match",
    });
  }

  try {
    // we can use req.body if body and usermodel structure are same otherwise we have to pass onject with key Value Pair
    const userInfo = userModel(req.body);
    const result = await userInfo.save();
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: true,
        message: "Account Already exist",
      });
    }
    return res.status(400).json({
      success: true,
      message: error.message,
    });
  }
  return res.status(200).json({
    success: true,
    data: req.body,
  });
};
const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All  feilds are required",
    });
  }

  try {
    // we have to get password explicitly as we have make select false in userSchema
    const user = await userModel.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    // creating token
    const token = user.jwtToken();

    user.password = undefined;

    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    // setting token in cookie
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: error.message,
    });
  }
};
const getUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    const cookieOption = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOption);
    return res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    return res.status(200).json({
      success: true,
      message: error.message,
    });
  }
};
module.exports = { signup, signin, getUser, logout };
