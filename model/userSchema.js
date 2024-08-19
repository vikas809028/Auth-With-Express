const mongoose = require("mongoose");
const { Schema } = mongoose;
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      minLength: [5, "Name must be at least 5 character"],
      maxLength: [50, "Name must not be greater than 50 character"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User name is required"],
      lowercase: true,
      unique: [true, "Already Registered email"],
      trim: true,
    },
    password: { type: String, select: false },
    forgotpasswordToken: {
      type: String,
    },
    forgotpasswordExpiryDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// custom middleware this will trigger when someone call save method
// it will called whwnever password is modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods = {
  jwtToken() {
    return JWT.sign(
      {
        id: this._id,
        email: this.email,
      },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
  },
};
// here user is model name
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
